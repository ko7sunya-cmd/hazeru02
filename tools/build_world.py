#!/usr/bin/env python3
"""world/ のYAMLとMarkdownを検証し、サイト用の assets/data/world.js を書き出す。

使い方:
    python3 tools/build_world.py          # 検証して書き出す
    python3 tools/build_world.py --check  # 検証だけ（書き出さない）

world.js は window.WORLD に代入する形なので、index.html をファイルとして直接開いても動く。
"""
import json
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
WORLD = ROOT / "world"
OUT = ROOT / "assets" / "data" / "world.js"

ID_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
REQUIRED = ["id", "type", "name", "reading", "en", "tags", "access", "name_origin", "summary"]
LAYER_PREFIX = {"up-city": "up-", "bd-market": "bd-", "lo-old": "lo-"}


def load_vocab():
    vocab = yaml.safe_load((WORLD / "data" / "vocab.yaml").read_text(encoding="utf-8"))
    tags = [t for group in vocab["tags"].values() for t in group]
    return vocab, set(tags)


def load_places():
    places = []
    for path in sorted((WORLD / "data" / "places").rglob("*.yaml")):
        items = yaml.safe_load(path.read_text(encoding="utf-8")) or []
        for item in items:
            item["_file"] = str(path.relative_to(ROOT))
            places.append(item)
    return places


def parse_markdown(path):
    """先頭の段落を lead、`## 見出し` ごとに sections にまとめる（段落だけの簡易版）。"""
    lead, sections, current = [], [], None
    for block in re.split(r"\n\s*\n", path.read_text(encoding="utf-8").strip()):
        block = block.strip()
        if block.startswith("## "):
            current = {"heading": block[3:].strip(), "paras": []}
            sections.append(current)
        elif current is None:
            lead.append(tidy(block))
        else:
            current["paras"].append(tidy(block))
    return {"lead": lead, "sections": sections}


JA_GAP = re.compile(r"(?<=[^\x00-\x7F])\s+(?=[^\x00-\x7F])")


def tidy(text):
    """YAMLの折り返しで日本語の間に入った改行・空白を取り除く。"""
    return JA_GAP.sub("", text.strip())


def paragraphs(text):
    return [tidy(p) for p in re.split(r"\n\s*\n", text or "") if p.strip()]


def validate(places, vocab, tag_set):
    errors = []
    by_id = {}
    for p in places:
        where = f"{p.get('_file')}:{p.get('id', '?')}"
        for key in REQUIRED:
            if key not in p or p[key] in (None, ""):
                errors.append(f"{where}: 必須項目 {key} がない")
        pid = p.get("id", "")
        if not ID_RE.match(str(pid)):
            errors.append(f"{where}: IDは英小文字・数字・ハイフンのみ")
        if pid in by_id:
            errors.append(f"{where}: ID {pid} が重複（{by_id[pid]['_file']}）")
        by_id[pid] = p
        if p.get("type") not in vocab["types"]:
            errors.append(f"{where}: 未知の type {p.get('type')}")
        if p.get("access") not in vocab["access"]:
            errors.append(f"{where}: 未知の access {p.get('access')}")
        if p.get("type") in ("spot", "route") and p.get("category") not in vocab["categories"]:
            errors.append(f"{where}: スポット・道には category（{', '.join(vocab['categories'])}）が必要")
        for tag in p.get("tags") or []:
            if tag not in tag_set:
                errors.append(f"{where}: タグ「{tag}」が vocab.yaml にない")
        m = p.get("map")
        if m is not None:
            if not all(isinstance(m.get(k), (int, float)) and 0 <= m[k] <= 100 for k in ("x", "y")):
                errors.append(f"{where}: map の x, y は 0〜100 の数値（画像に対する%）")
        if p.get("text") and not (WORLD / p["text"]).exists():
            errors.append(f"{where}: text のファイル {p['text']} がない")

    for p in places:
        where = f"{p['_file']}:{p.get('id')}"
        parent = p.get("parent")
        if p.get("type") == "world":
            if parent is not None:
                errors.append(f"{where}: world に parent は付けない")
        elif parent not in by_id:
            errors.append(f"{where}: 親 {parent} が存在しない")
        for adj in p.get("adjacent") or []:
            if adj.get("to") not in by_id:
                errors.append(f"{where}: 隣接先 {adj.get('to')} が存在しない")
            elif adj["to"] == p["id"]:
                errors.append(f"{where}: 自分自身に隣接している")
    return errors, by_id


def layer_of(p, by_id):
    seen = set()
    while p and p["id"] not in seen:
        seen.add(p["id"])
        if p.get("type") == "layer":
            return p["id"]
        p = by_id.get(p.get("parent"))
    return None


def build(places, by_id, vocab):
    errors = []
    # 隣接は片側に書けばよい。逆向きをここで補う。
    adjacency = {p["id"]: {} for p in places}
    for p in places:
        for adj in p.get("adjacent") or []:
            a, b = p["id"], adj["to"]
            entry = {k: v for k, v in adj.items() if k != "to"}
            adjacency[a].setdefault(b, entry)
            adjacency[b].setdefault(a, entry)

    out = []
    for p in places:
        layer = layer_of(p, by_id)
        prefix = LAYER_PREFIX.get(layer)
        if prefix and not p["id"].startswith(prefix):
            errors.append(f"{p['_file']}:{p['id']}: {layer} 配下のIDは {prefix} で始める")
        item = {k: v for k, v in p.items() if not k.startswith("_") and k not in ("adjacent", "body", "text")}
        for key in ("name_origin", "summary", "rumor", "access_note"):
            if isinstance(item.get(key), str):
                item[key] = tidy(item[key])
        item["layer"] = layer
        item["children"] = [c["id"] for c in places if c.get("parent") == p["id"]]
        item["adjacent"] = [{"to": to, **info} for to, info in adjacency[p["id"]].items()]
        item["body"] = paragraphs(p.get("body"))
        if p.get("text"):
            item["essay"] = parse_markdown(WORLD / p["text"])
        out.append(item)

    data = {
        "categories": vocab["categories"],
        "access": vocab["access"],
        "types": vocab["types"],
        "places": out,
    }
    return data, errors


def main():
    vocab, tag_set = load_vocab()
    places = load_places()
    errors, by_id = validate(places, vocab, tag_set)
    if not errors:
        data, more = build(places, by_id, vocab)
        errors += more
    if errors:
        print("検証エラー:", file=sys.stderr)
        for e in errors:
            print("  - " + e, file=sys.stderr)
        sys.exit(1)

    counts = {}
    for p in places:
        counts[p["type"]] = counts.get(p["type"], 0) + 1
    summary = "、".join(f"{vocab['types'][t]} {n}" for t, n in counts.items())
    if "--check" in sys.argv:
        print(f"OK（{summary}）")
        return
    OUT.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps(data, ensure_ascii=False, indent=1)
    OUT.write_text(
        "// tools/build_world.py が生成。手で編集しない（world/ を直してから再生成する）。\n"
        f"window.WORLD = {body};\n",
        encoding="utf-8",
    )
    print(f"{OUT.relative_to(ROOT)} を書き出しました（{summary}）")


if __name__ == "__main__":
    main()
