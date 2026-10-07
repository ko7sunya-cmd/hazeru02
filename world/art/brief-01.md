# ロケーションイラスト発注書 第1弾（共通する6か所）

複数のコースで使い回す場所を、先に描くための指示書。6か所で、時間帯違いを含めて **10枚**。

| # | 場所 | ID | 枚数 | 使うコース |
|---|---|---|---|---|
| 1 | 降り筒・第一口 | `bd-orizutsu` | 朝・夜（2枚） | しおり／つゆ／ひまり（寄り道） |
| 2 | 旧駅舎大広間 | `lo-concourse` | 朝・夜（2枚） | しおり／つゆ／ひまり（寄り道） |
| 3 | 赤鶴の荷揚げ場 | `bd-crane` | 朝（1枚） | しおり／ひまり |
| 4 | 幌通り | `bd-horo-row` | 昼・夕方（2枚） | しおり／ひまり |
| 5 | 灯籠舟の夕市 | `bd-lantern` | 日没（1枚） | つゆ／ひまり（寄り道） |
| 6 | 灯幕通り | `up-lanterns` | 昼・夜（2枚） | しおり／すず |

---

## 共通ルール（全枚数に適用）

### 画面の規格
- **縦長 4:5**（例: 1080×1350 以上）。切り出しはサイト側で行う。
- 文字の箱が画面の**下の約40%**を覆う。**見せたいものは、上の60%に置く。**
- 下の40%は、**細かい描き込みを避ける**（水面、床、影、空気の抜け）。暗めか、ゆるやかな面にする。
- 保存形式は webp（品質80）。ファイル名は `assets/img/places/<場所ID>.webp`。時間帯違いは `-night`（夜）、`-dusk`（夕方）、`-morning`（朝）を付ける。

### 世界の見た目（スタイル）
- **明るく、透明感のある、アニメ調の背景画。** 青い水、白と淡い青の建物、緑（苔・蔦・屋上の植物）。
- 沈んだ建物は**手入れされている**。荒廃ではなく「古いものが大切に使われている」雰囲気。廃墟っぽさ、不気味さ、暗い怖さは出さない。
- 水は澄んでいる。光が差し込み、小魚の群れがいる。
- 光は「空気が見える」ような、やわらかい光の筋（ボリュームライト）。

### 入れてはいけないもの
- **読める文字、ロゴ、実在の企業・商品名・看板**（看板は、記号・模様・読めない文字風にする）
- 人物の**顔のアップ**。人は、遠景の小さなシルエット・逆光で、数人まで。（案内役はアイコンで出すので、絵には描かない）
- 戦争・災害・危機を連想させるもの。壊れた建物、炎、暗い嵐。

### 共通の英語プロンプト（先頭に付ける）
```
bright, highly detailed anime-style environment illustration, painterly, vivid blue water,
white and pale-blue architecture built on wooden piles, lush green plants and moss,
clear volumetric light, serene and welcoming atmosphere, vertical composition 4:5,
no text, no logos, no watermark, no close-up faces
```

### 共通のネガティブ（使える生成器の場合）
```
text, letters, logo, brand name, watermark, signature, close-up face, ruins, horror, dark storm,
fire, blood, low quality, blurry, cropped, deformed
```

---

## 1. 降り筒・第一口（`bd-orizutsu`）

**狙い**: 水面の上と下をまたぐ、ガラスの昇降機。「ここから下の街へ降りる」わくわくを一枚で見せる。

**構図（上60%）**
- 水面の断面を見せる構図（半分が水上、半分が水中）。画面の中央やや上に**水面の線**が横に走る。
- 水面をまたいで、**円筒形のガラスの籠**が立っている。上半分は空気中、下半分は水の中。
- 籠の背後に、大きな看板を掲げた塔（看板は、模様だけで文字なし）。
- 水中では、籠のまわりを杭が立ち並び、**杭に小魚の群れ**が付いている。
- 下の40%は、**濃い青の水中と、水面の反射**にして、細部を減らす。

**要素**: 籠の中に、小さな人影が1〜2人。ガラスの縁に金属の枠。杭の足元に貝（濾し貝）が付いている。

### 朝（`bd-orizutsu-morning`）
- 光: 明るい朝日。水面がきらきら光り、水中に光の筋が降りる。青 → 緑 → 白へと色が変わる水の層が見える。
- 空: 淡い水色、薄い雲。

### 夜（`bd-orizutsu-night`）
- 光: 籠が**内側からほのかに光る**。水は濃い青で、遠くの灯籠舟の光が、水面に揺れて見える。
- 灯魚が1匹、籠のそばを泳ぐ（小さく淡い青白い光）。
- 空: 星が少し見える、群青。

**プロンプト（朝・追記分）**
```
a glass cylindrical elevator capsule standing across the water surface, half above and half below,
split-level view of water line, tall tower with an abstract emblem sign behind,
wooden piles with schools of small fish and shellfish underwater,
bright morning sunlight, light shafts through clear water, color gradient from blue to green to white
```
**夜のとき**: `bright morning sunlight` → `calm night, deep blue water, the capsule softly glowing from inside, distant lantern boats reflected on the water, a single faintly glowing small fish, starry sky`

---

## 2. 旧駅舎大広間（`lo-concourse`）

**狙い**: 沈んだ駅舎の中央通路。窓の外を魚が列車のように通り過ぎる、水族館のような公共の広間。

**構図（上60%）**
- **一点透視**。奥へ続く広い通路。消失点は、画面中央やや上。
- 左右の壁は**大きな窓**（厚いガラス）。外は水中で、魚の群れが帯のように横切る。
- 高い天井と柱。柱や壁に、緑の蔦や苔が少し。
- 通路の途中に、古い**発車標**（行き先の文字は読めない記号に）と、ベンチ。
- 下の40%は、**なめらかな床と、窓の光が落ちた反射**にして、細部を減らす。

**要素**: ベンチに座る人の小さなシルエットが2〜3人。案内板、花の鉢植え。

### 朝（`lo-concourse-morning`）
- 光: 天窓や窓から、**青〜緑の光の筋**が床に落ち、揺れた模様が床に映る。昼より少し淡く、静か。
- 空気: 澄んで明るい。魚の群れが光を反射する。

### 夜（`lo-concourse-night`）
- 光: **青い常夜灯**が床や柱の足元にともる。窓の外は暗い青で、魚たちが眠る前のゆっくりした列で泳ぐ。
- 人はほとんどいない（ベンチに1人、遠景）。静かで、少し寂しいが、怖くはない。

**プロンプト（朝・追記分）**
```
interior of a large sunken train station concourse, maintained and clean, one-point perspective,
tall windows of thick glass on both sides with schools of fish swimming past outside like trains,
old departure board with unreadable symbols, benches, green vines on pillars,
blue-green light shafts falling on the floor with rippling light patterns, calm and quiet
```
**夜のとき**: `blue night lamps along the floor and pillar bases, dark blue water outside the windows, fish swimming in slow lines, almost empty, very quiet, a single person on a bench far away`

---

## 3. 赤鶴の荷揚げ場（`bd-crane`）

**狙い**: 水上マーケットの目印の、赤い荷揚げクレーン。「赤鶴の足元で」の待ち合わせの場所。

**構図（上60%）**
- **やや見上げる低めのアングル**で、赤い長い首のクレーンを画面の主役に。首は鶴のように曲線を描く。
- クレーンの先から、**木箱が一つ吊り下がり**、下の台車へ降りようとしている。
- 手前に荷舟と木箱、ロープ。奥に水上バス（白い船体に青い線）と、桟橋の屋台。
- 下の40%は、**水面と桟橋の板**にして、細部を減らす。

**要素**: 荷さばきの人が小さなシルエットで数人。笛を吹く人。ロープ、木箱、湯気。

### 朝（`bd-crane`、1枚のみ）
- 光: **朝のやわらかい逆光**。クレーンの赤が青い空と水に映える。市場の湯気が光を拡散する。
- 空: 淡い水色と薄いオレンジの境目。

**プロンプト**
```
a tall red harbor crane with a long curved neck like a crane bird, lifting a wooden crate over a boat basin,
low angle view looking up, cargo boats, wooden crates and ropes in the foreground,
a white water bus with a blue stripe in the background, market piers with awnings,
soft morning backlight, steam in the air, small silhouettes of workers
```

---

## 4. 幌通り（`bd-horo-row`）

**狙い**: 屋台が肩を寄せ合う桟橋の一本道。串焼きの煙、汁物の湯気、人のざわめき。

**構図（上60%）**
- **一点透視**で、桟橋の一本道を奥へ。左右に、橙・赤・白の**幌（日除け）**が連なる。
- 幌が画面の上部を**縁取る**ようにする。幌の下に、屋台の灯りと湯気。
- 足元の桟橋の板は、**すき間から水面が見える**。
- 下の40%は、**板の床と影**にして、細部を減らす。

**要素**: 串焼きの煙、貝の汁の湯気、吊るした電球や提灯（文字なし）、人の小さな後ろ姿のシルエットが数人。猫が1匹いてもよい。

### 昼（`bd-horo-row`）
- 光: 明るい昼の光。幌の色が鮮やかで、陰影がはっきり。空は青。

### 夕方（`bd-horo-row-dusk`）
- 光: **金色の夕日**が通りの奥から差し込み、煙と湯気が逆光で光る。幌の橙が燃えるような色。
- 屋台の灯りがともりはじめる。人が増える。

**プロンプト（昼・追記分）**
```
a pier street lined with colorful awnings in orange, red and white, one-point perspective,
food stalls with grilling skewers smoke and soup steam, hanging lamps with no text,
gaps between wooden planks showing water below, small silhouettes of people from behind, lively and warm
```
**夕方のとき**: `golden sunset light from the far end of the street, backlit steam and smoke glowing, orange awnings glowing, stall lamps just turning on`

---

## 5. 灯籠舟の夕市（`bd-lantern`）

**狙い**: 日没とともに、灯籠を吊るした小舟が集まって開く、水の上の夜市。この世界でいちばん「幻想的」な一枚にする。

**構図（上60%）**
- 桟橋の端から、**やや見下ろす**構図。水面に**灯籠舟が連なって、一本の通り**になる。
- 灯籠は、丸い・四角い・魚形など、さまざま。**暖かい橙の光**。
- 水面に、灯籠の光が長く映る。
- 水の下には、**沈んだ旧駅舎の屋根**が、灯籠の光に淡く照らされて、ぼんやり見える。（光の模様が屋根に落ちる）
- 下の40%は、**暗い水面と、光の反射**にして、細部を減らす。

**要素**: 舟の上に、屋台（甘いもの、小さな灯り、紙）。客が舟から舟へ渡る小さなシルエット。灯魚の形の飴細工が、一つ光っている。

### 日没（`bd-lantern`、1枚のみ）
- 光: 空は**橙から群青へ**のグラデーション。灯籠の暖色と、水の青の対比。
- 空気: 静かで、少しだけ誇らしい祭りの前の感じ。

**プロンプト**
```
a night market on water at sunset, many small boats gathered side by side forming a street,
each boat hanging lanterns of various shapes including round, square and fish-shaped, warm orange glow,
long light reflections on the water, the roof of a sunken station faintly visible under the clear water
with ripples of lantern light on it, silhouettes of people stepping between boats,
sky gradient from orange to deep blue, magical and calm
```

---

## 6. 灯幕通り（`up-lanterns`）

**狙い**: 塔の壁一面が「灯幕」（大きな表示幕）になった、上層の大通り。昼は静かで、夜は光の通りになる。

**構図（上60%）**
- **左右に塔がそびえる、谷のような大通り**。塔の壁面に、**縦長の大きな幕**がいくつも並ぶ。
- 幕には、**文字ではなく、記号や模様**（潮位の波形、天気の絵記号、花のような模様）。
- 通りの両側に、屋上の緑がのぞく。足元に、桟橋のすき間から、水面がちらっと見える。
- 空は、塔の間に細い帯として見える。
- 下の40%は、**通りの床（光る路面と影）**にして、細部を減らす。

**要素**: 幕の隅に小さな伝言風の模様。通りを歩く、小さなシルエット数人。

### 昼（`up-lanterns`）
- 光: **昼の明るさのなかで、幕は白く淡く光る**。夜のような色はなく、静か。
- 空: 明るい水色。

### 夜（`up-lanterns-night`）
- 光: 幕が**ゆっくり色を変える**（青、紫、桃、黄）。その光が桟橋のすき間から水面へ落ち、下の街の天井までほんのり染める。
- 空: 群青。通りは明るく賑やか。夜のほうが人が多い。

**プロンプト（昼・追記分）**
```
a broad avenue between tall towers like a canyon, large vertical display screens covering the tower walls
showing abstract symbols such as wave patterns, weather icons and flower-like patterns, no readable text,
rooftop greenery visible above, water glimpsed through gaps in the pier floor,
a narrow strip of bright blue sky, calm daytime atmosphere, screens glowing softly in white
```
**夜のとき**: `night, screens slowly changing colors of blue, purple, pink and yellow, colored light spilling through gaps in the pier onto the water below, deep navy sky, lively and bright street`

---

## 描いたあとの手順
1. 画像は `assets/img/places/` に、上のファイル名で置く。
2. 私が、場所のデータに `art` を登録して、表示に反映する。（置いたら教えてください）
3. 絵がない場所は、自動で「地図の窓」に切り替わるので、順不同で、できたものから足していってよい。
