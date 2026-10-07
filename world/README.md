# world/ — 新宿・水上都市の世界観データ

サイト（`index.html`）に表示される場所と文章の原本。ここを直して `tools/build_world.py` を実行すると、サイトに反映される。

## ファイル構成

```
world/
├─ README.md            このファイル（編集ルール）
├─ canon.md             確定事項と空気感のルール。書く前に必ず読む
├─ glossary.md          用語集
├─ characters/          案内役の人物シート（Markdown）
├─ art/                 ロケーションイラストの発注書（Markdown）
├─ data/
│   ├─ vocab.yaml       使える分類・タグ・表情IDの一覧
│   ├─ characters/      案内役のデータ（アイコン画像のパスなど）
│   ├─ courses/         案内役ごとのコース（台本）
│   └─ places/          場所データ（ファイル名の数字順に読み込まれる）
│       ├─ 00-world.yaml
│       ├─ 10-upper.yaml    上層・新都市
│       ├─ 20-border.yaml   境界・水上マーケット
│       └─ 30-lower.yaml    下層・旧新宿
└─ places/              層の長い解説文（Markdown）
```

場所が増えてファイルが重くなったら、`places/10-upper/terrace.yaml` のようにフォルダへ分けてよい（`places/` 以下の `*.yaml` はすべて読み込まれる）。

## 場所を足す手順

1. 親にする街区を決める（なければ街区から作る）。
2. その層のYAMLに項目を足す。IDは層ごとの接頭辞（`up-` / `bd-` / `lo-`）で始める。
3. 地図に点を置くなら `map: {x, y}` を書く。画像の左上を 0、右下を 100 とした%の値。
4. `python3 tools/build_world.py` を実行する。エラーが出たら直して再実行する。
5. 新しい言葉を作ったら `glossary.md` に、新しいタグは `vocab.yaml` に足す。

## 案内役とコースを足す手順

- **コースを足す**: `data/courses/` に YAML を1ファイル足す。一覧での並びは `order`（小さい順。省略すると最後）で決まる。`steps` に場所IDを順に並べ、各 step に `lines`（セリフ）と、任意で `detour`（寄り道）を書く。場所には `map` 座標が必要。
- **案内役を足す**: `data/characters/` に YAML を足し、人物シートを `characters/` に書く。アイコン画像は `assets/img/` に置く。
- **表情**: 台本では `vocab.yaml` の表情ID（normal / smile / surprise / quiet / tease）を使う。キャラ側に画像が無い表情は、normal の画像で代用される。画像ができたら、キャラのYAMLの `expressions` に足すだけでよい。
- セリフの `who:` は、省略するとキャラ本人、`narration` なら地の文。
- **呼応**: step に `echoes` を足すと、`after` のコースを歩き終えた人にだけ、その場所の本線のあとに数行が加わる。`label`（区切りの見出し）と `lines` を書く。歩いた記録はブラウザ内（localStorage）にだけ残る。
- **場所からコースへのリンク**: 場所の解説ページには、その場所を通るコースが自動で並ぶ。コースの steps と detour に場所IDを書くだけで、リンクが付く。

## 項目一覧（場所）

| 項目 | 必須 | 内容 |
|---|---|---|
| `id` | ○ | 英小文字・数字・ハイフン。**一度決めたら変えない**（URLになる） |
| `type` | ○ | `world` / `layer` / `district` / `spot` / `route` |
| `parent` | ○ | 親のID（`world` だけは `null`） |
| `name` / `reading` / `en` | ○ | 正式名、読み、英語名 |
| `alias` | | 住人の呼び名 |
| `category` | spot・route は○ | `daily`（日常） / `sightseeing`（観光） / `landmark`（名所） / `mystic`（神秘） |
| `tags` | ○ | 雰囲気タグ。`vocab.yaml` にあるものだけ |
| `access` | ○ | `open` / `limited` / `closed` |
| `access_note` | | 立入条件や制限の理由（穏やかな理由のみ。`canon.md` 参照） |
| `best_time` | | おすすめの時間帯 |
| `map` | | 地図上の位置 `{x, y}`（%） |
| `adjacent` | | 隣接する場所 `[{to, via, note}]`。**片側に書けば逆向きは自動で補われる** |
| `name_origin` | ○ | 地名の由来 |
| `summary` | ○ | 一行の紹介 |
| `body` | | 本文。空行で段落を分ける。改行は自由に入れてよい（日本語の間の改行は詰められる） |
| `rumor` | | 住人の噂（1〜2行） |
| `text` | | 長い解説文のMarkdown（層で使用）。`## 見出し` で区切る |

## 文章の書き方

- 世界遺産の解説のように、三人称・現在形で、事実を積み重ねて情景を浮かばせる。
- スポットの本文は 3〜4文、150〜250字が目安。層の解説は 600〜900字。
- 噂だけは住人の声に寄せて、少し温度を変える。不思議でも、怖くはしない。
- 一つの場所に、光・音・匂い・人の動きのうち二つ以上を入れると情景が立ちやすい。

## コマンド

```sh
python3 tools/build_world.py          # 検証して assets/data/world.js を書き出す
python3 tools/build_world.py --check  # 検証だけ
```

必要なもの: Python 3 と PyYAML（`pip install pyyaml`）。
