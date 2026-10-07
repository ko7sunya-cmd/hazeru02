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


def load_dir(sub):
    items = []
    for path in sorted((WORLD / "data" / sub).rglob("*.yaml")):
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or []
        for item in data if isinstance(data, list) else [data]:
            item["_file"] = str(path.relative_to(ROOT))
            items.append(item)
    return items


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


def validate_story(characters, courses, by_id, vocab):
    errors = []
    chars = {}
    for c in characters:
        where = f"{c['_file']}:{c.get('id', '?')}"
        for key in ("id", "name", "short", "reading", "title", "icon", "expressions", "intro"):
            if not c.get(key):
                errors.append(f"{where}: 必須項目 {key} がない")
        if c.get("id") in chars:
            errors.append(f"{where}: キャラID {c['id']} が重複")
        chars[c.get("id")] = c
        exprs = c.get("expressions") or {}
        if "normal" not in exprs:
            errors.append(f"{where}: expressions に normal が必要")
        for e in exprs:
            if e not in vocab["expressions"]:
                errors.append(f"{where}: 表情ID {e} が vocab.yaml の expressions にない")
        for path in [c.get("icon"), c.get("portrait"), *exprs.values()]:
            if path and not (ROOT / path).exists():
                errors.append(f"{where}: 画像 {path} がない")
        if c.get("sheet") and not (WORLD / c["sheet"]).exists():
            errors.append(f"{where}: sheet {c['sheet']} がない")

    seen = set()
    for co in courses:
        where = f"{co['_file']}:{co.get('id', '?')}"
        for key in ("id", "character", "title", "steps"):
            if not co.get(key):
                errors.append(f"{where}: 必須項目 {key} がない")
        if co.get("id") in seen:
            errors.append(f"{where}: コースID {co['id']} が重複")
        seen.add(co.get("id"))
        char = chars.get(co.get("character"))
        if char is None:
            errors.append(f"{where}: キャラ {co.get('character')} が存在しない")
            continue

        def check_lines(lines, label):
            if not lines:
                errors.append(f"{where}: {label} に lines がない")
            for i, ln in enumerate(lines or [], 1):
                if not str(ln.get("text", "")).strip():
                    errors.append(f"{where}: {label} の {i} 行目に text がない")
                if ln.get("who", "character") not in ("character", "narration"):
                    errors.append(f"{where}: {label} の {i} 行目の who が不正")
                if ln.get("expr") and ln["expr"] not in vocab["expressions"]:
                    errors.append(f"{where}: {label} の {i} 行目の表情 {ln['expr']} が vocab.yaml にない")

        for n, step in enumerate(co.get("steps") or [], 1):
            if step.get("place") not in by_id:
                errors.append(f"{where}: step {n} の場所 {step.get('place')} が存在しない")
            elif not by_id[step["place"]].get("map"):
                errors.append(f"{where}: step {n} の場所 {step['place']} に map 座標がない")
            check_lines(step.get("lines"), f"step {n}")
            d = step.get("detour")
            if d:
                if d.get("place") not in by_id:
                    errors.append(f"{where}: step {n} の寄り道先 {d.get('place')} が存在しない")
                elif not by_id[d["place"]].get("map"):
                    errors.append(f"{where}: step {n} の寄り道先 {d['place']} に map 座標がない")
                if not d.get("label"):
                    errors.append(f"{where}: step {n} の寄り道に label がない")
                check_lines(d.get("lines"), f"step {n} の寄り道")
    return errors


def layer_of(p, by_id):
    seen = set()
    while p and p["id"] not in seen:
        seen.add(p["id"])
        if p.get("type") == "layer":
            return p["id"]
        p = by_id.get(p.get("parent"))
    return None


def build_story(characters, courses):
    chars = []
    for c in characters:
        item = {k: v for k, v in c.items() if not k.startswith("_") and k != "sheet"}
        item["intro"] = tidy(item["intro"])
        chars.append(item)
    out = []
    for co in courses:
        item = {k: v for k, v in co.items() if not k.startswith("_")}
        item["summary"] = tidy(item.get("summary", ""))
        out.append(item)
    return chars, out


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
        "expressions": vocab["expressions"],
        "places": out,
    }
    return data, errors


def main():
    vocab, tag_set = load_vocab()
    places = load_places()
    characters = load_dir("characters")
    courses = load_dir("courses")
    errors, by_id = validate(places, vocab, tag_set)
    if not errors:
        errors += validate_story(characters, courses, by_id, vocab)
    if not errors:
        data, more = build(places, by_id, vocab)
        data["characters"], data["courses"] = build_story(characters, courses)
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
    summary += f"、キャラ {len(characters)}、コース {len(courses)}"
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
