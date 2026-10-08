// tools/build_world.py が生成。手で編集しない（world/ を直してから再生成する）。
window.WORLD = {
 "categories": {
  "daily": {
   "label": "日常",
   "description": "住人の暮らしがそのまま見える場所",
   "color": "#f2b56b"
  },
  "sightseeing": {
   "label": "観光",
   "description": "訪れる人のために開かれた、見て歩く場所",
   "color": "#5fd4e8"
  },
  "landmark": {
   "label": "名所",
   "description": "街の象徴。誰もが知っていて、目印になる場所",
   "color": "#f4ecd2"
  },
  "mystic": {
   "label": "神秘",
   "description": "理由はわからないが、不思議で、少しだけ心が静まる場所",
   "color": "#b79cf5"
  }
 },
 "access": {
  "open": "自由に出入りできる",
  "limited": "条件つきで入れる",
  "closed": "立入制限（穏やかな理由のみ）"
 },
 "types": {
  "world": "世界",
  "layer": "層",
  "district": "街区",
  "spot": "スポット",
  "route": "道・乗り物"
 },
 "expressions": {
  "normal": "通常",
  "smile": "笑う",
  "surprise": "驚く",
  "quiet": "静か",
  "tease": "いたずら"
 },
 "timeSlots": {
  "朝": "morning",
  "午前": "morning",
  "昼前": "morning",
  "雨上がりの朝": "morning",
  "昼": "day",
  "昼下がり": "day",
  "午後": "day",
  "夕方": "dusk",
  "夕方前": "dusk",
  "日没前": "dusk",
  "日没": "dusk",
  "夜": "night"
 },
 "places": [
  {
   "id": "shinjuku",
   "type": "world",
   "parent": null,
   "name": "新宿・水上都市",
   "reading": "しんじゅく・すいじょうとし",
   "en": "Shinjuku, the Waterborne City",
   "tags": [
    "眺望",
    "生活感",
    "水音"
   ],
   "access": "open",
   "best_time": "いつでも",
   "name_origin": "沈みはじめる前の地名を、そのまま使い続けている。名前を変えようという話は何度か出たが、「水の上でも新宿は新宿だ」という声がいつも勝った。",
   "summary": "水の上に、もうひとつの新宿がある。",
   "layer": null,
   "children": [
    "up-city",
    "bd-market",
    "lo-old"
   ],
   "adjacent": [],
   "body": [
    "百年ほどかけてゆっくりと水に沈んだ新宿は、いまも人が暮らす街として続いている。杭の上に積み上げた上層の新都市、水面に浮かぶ境界の市場、封水されて水底に眠る下層の旧新宿。三つの層は降り筒と階段と舟でつながり、住人は毎日あたりまえのように行き来している。",
    "地図の点を選ぶと、その場所の解説が開きます。層や楽しみ方で絞り込みながら、気になる場所から歩いてみてください。"
   ]
  },
  {
   "id": "up-city",
   "type": "layer",
   "parent": "shinjuku",
   "name": "新都市",
   "reading": "しんとし",
   "alias": "あがり",
   "en": "The Upper City",
   "tags": [
    "賑わい",
    "生活感",
    "眺望",
    "風通し"
   ],
   "access": "open",
   "best_time": "一日中",
   "map": {
    "x": 53,
    "y": 17.7
   },
   "name_origin": "正式名は「新都市」。住人は「あがり」と呼ぶ。水から上がって暮らす場所という意味と、双六の「上がり」、つまり長い道のりの末にたどり着いた場所という意味が重なっている。",
   "summary": "古い新宿の上に杭を打ち、百年かけて積み上げた暮らしの層。",
   "layer": "up-city",
   "children": [
    "up-terrace",
    "up-towers",
    "up-gardens"
   ],
   "adjacent": [
    {
     "to": "bd-market",
     "via": "杭見坂と荷揚げ昇降機"
    },
    {
     "to": "bd-harbor",
     "via": "荷揚げ昇降機"
    }
   ],
   "body": [],
   "essay": {
    "lead": [
     "新都市は、沈みゆく新宿の上に、住人たちが少しずつ足場を継ぎ足してできた街である。地図の上では一枚の大きな島に見えるが、実際には数千本の杭に支えられた桟橋とテラスの集まりで、どこを歩いても、足元のどこかに水がある。"
    ],
    "sections": [
     {
      "heading": "成り立ち",
      "paras": [
       "水が街に入りはじめたのは、およそ百年前のことだとされる。地盤は年に数センチずつ下がり、同じだけ水位が上がった。住人は一度に逃げ出す必要がなかった。低くなった階を手放し、屋上に新しい床を張り、隣のビルと渡り廊下でつなぐ。それを三世代かけて繰り返した結果が、いまの新都市である。古いビルの骨組みが、そのまま杭として使われているところも多い。"
      ]
     },
     {
      "heading": "見どころ",
      "paras": [
       "中心の大桟橋テラスには水鏡ドームの広場があり、商店のひさしが連なる。昼は買い物客で、夜は灯幕の光で満ちる。東の塔町では、高層の壁面を覆う大きな幕が、潮位や天気、住人の伝言を映し出す。北と西の段々屋上には、雨水を受ける庭と洗濯物の路地が広がる。観光地というより、人が暮らしている気配そのものが見どころになっている。"
      ]
     },
     {
      "heading": "今の姿",
      "paras": [
       "新都市は「上の街」と呼ばれるが、下の街を見下ろす場所ではない。住人の多くは朝、降り筒で下層の職場へ降り、夕方に戻ってくる。ドーム広場の噴水には下層から汲み上げた水が使われ、屋上の菜園は境界の市場へ野菜を卸す。三つの層は、ここでひとつの暮らしとしてつながっている。"
      ]
     },
     {
      "heading": "噂と決まりごと",
      "paras": [
       "大桟橋のまんなかにある「初杭」に耳を当てると、沈んだ駅を出ていく電車の音がする、と子どもたちは信じている。塔町の最上部は風の強い日に閉鎖されるが、それは単に、洗濯物と帽子がよく飛ぶからだ。"
      ]
     }
    ]
   }
  },
  {
   "id": "up-terrace",
   "type": "district",
   "parent": "up-city",
   "name": "大桟橋テラス",
   "reading": "おおさんばしテラス",
   "en": "The Great Pier Terrace",
   "tags": [
    "賑わい",
    "待ち合わせ",
    "生活感"
   ],
   "access": "open",
   "best_time": "昼",
   "name_origin": "最初期の桟橋が何枚も継ぎ合わされ、いつのまにか一枚の広いテラスになった。それでも「桟橋」の名前だけは手放されなかった。",
   "summary": "新都市のまんなか。広場と商店が連なる、いちばん人の多い床。",
   "layer": "up-city",
   "children": [
    "up-dome-plaza",
    "up-hatsukui",
    "up-kuimi"
   ],
   "adjacent": [
    {
     "to": "up-towers",
     "via": "渡り廊下"
    },
    {
     "to": "up-gardens",
     "via": "屋上階段"
    }
   ],
   "body": [
    "何百本もの杭に支えられた、新都市でいちばん広い床。商店のひさしと植え込みが段々に重なり、通りは緩やかな坂でつながっている。床板の色が場所ごとに少しずつ違うのは、継ぎ足された年代の違いで、住人はそれを「床の年輪」と呼ぶ。"
   ]
  },
  {
   "id": "up-towers",
   "type": "district",
   "parent": "up-city",
   "name": "塔町",
   "reading": "とうまち",
   "en": "Tower Quarter",
   "tags": [
    "ネオン",
    "眺望",
    "夜が本番"
   ],
   "access": "open",
   "best_time": "夕方〜夜",
   "name_origin": "沈む前から建っていた高層ビルが、水に浸かったあとも残った一帯。上に伸びるしかなかった街の、いちばん背の高い部分という意味で、いつしか「塔町」と呼ばれた。",
   "summary": "灯幕に覆われた高層の街。夜になると水面まで色が落ちる。",
   "layer": "up-city",
   "children": [
    "up-lanterns",
    "up-shiomi",
    "up-horizon"
   ],
   "adjacent": [
    {
     "to": "up-terrace",
     "via": "渡り廊下"
    },
    {
     "to": "up-gardens",
     "via": "空中回廊"
    }
   ],
   "body": [
    "古い高層ビルの上半分に、新しい床と外壁を継いだ塔が集まる。壁面を覆う灯幕が、昼は潮位と天気を、夜は色とりどりの光を映す。見上げる街であると同時に、新都市でいちばん遠くまで見渡せる街でもある。"
   ]
  },
  {
   "id": "up-gardens",
   "type": "district",
   "parent": "up-city",
   "name": "段々屋上",
   "reading": "だんだんおくじょう",
   "en": "The Terraced Rooftops",
   "tags": [
    "生活感",
    "緑",
    "風通し",
    "朝が本番"
   ],
   "access": "open",
   "best_time": "朝",
   "name_origin": "高さの違うビルの屋上を、階段と板橋でつないでできた住宅地。上から見ると田んぼのような段々になっていることから。",
   "summary": "庭と洗濯物と猫の街。新都市の住人の多くはここで暮らしている。",
   "layer": "up-city",
   "children": [
    "up-rain-garden",
    "up-hoshiba"
   ],
   "adjacent": [
    {
     "to": "up-terrace",
     "via": "屋上階段"
    },
    {
     "to": "up-towers",
     "via": "空中回廊"
    }
   ],
   "body": [
    "屋上どうしを板橋でつないだ住宅地。どの家にも小さな庭があり、雨水を受ける桶と、送気塔の煙突が並ぶ。観光客が足を延ばすことは少ないが、新都市らしさがいちばん濃く残る場所でもある。"
   ]
  },
  {
   "id": "up-dome-plaza",
   "type": "spot",
   "parent": "up-terrace",
   "category": "landmark",
   "name": "水鏡ドーム広場",
   "reading": "みずかがみドームひろば",
   "en": "Mirror Dome Plaza",
   "tags": [
    "待ち合わせ",
    "水音",
    "賑わい",
    "木漏れ日の水"
   ],
   "access": "open",
   "best_time": "朝〜昼",
   "map": {
    "x": 59.8,
    "y": 28.6
   },
   "art": {
    "day": {
     "src": "assets/img/places/up-dome-plaza.webp",
     "focus": {
      "x": 50,
      "y": 30
     },
     "ripple": [
      {
       "x": [
        0,
        100
       ],
       "y": [
        50,
        100
       ],
       "power": 1.0
      }
     ],
     "sm": "assets/img/places/up-dome-plaza-sm.webp",
     "w": 750,
     "h": 1125,
     "smw": 667
    }
   },
   "name_origin": "ドームの足元に張られた浅い水盤が、ガラス屋根と空を鏡のように映すことから。",
   "summary": "噴水を抱いたガラスのドーム。新都市の待ち合わせといえば、ここ。",
   "rumor": "噴水の水には、下層の駅の匂いがかすかに残っている、と古い住人は言う。",
   "layer": "up-city",
   "children": [],
   "adjacent": [
    {
     "to": "up-hatsukui",
     "via": "中央通り"
    },
    {
     "to": "up-lanterns",
     "via": "渡り廊下"
    }
   ],
   "body": [
    "大桟橋テラスの東寄りにある、円いガラス屋根の広場。屋根の下には浅い水盤が張られ、晴れた日には空と雲がそっくり映り込む。中央の噴水には、降り筒の管を通って下層から汲み上げた水が使われている。濾し貝に濾された水は驚くほど澄んでいて、子どもたちは裸足で水盤を渡っていく。「ドームの下で」と言えば、それだけで待ち合わせが成立する。"
   ]
  },
  {
   "id": "up-hatsukui",
   "type": "spot",
   "parent": "up-terrace",
   "category": "mystic",
   "name": "初杭",
   "reading": "はつくい",
   "en": "The First Pile",
   "tags": [
    "懐かしい",
    "静けさ",
    "神秘"
   ],
   "access": "open",
   "best_time": "早朝",
   "map": {
    "x": 47,
    "y": 30.5
   },
   "name_origin": "新都市を建てるとき、最初に水底へ打ち込まれた一本の杭。その上に最初の床が張られた。",
   "summary": "新都市で最初に打たれた杭。テラスのまんなかに、ひっそり残っている。",
   "rumor": "耳を当てると、沈んだ駅を出ていく電車の音がする、と子どもたちは信じている。",
   "layer": "up-city",
   "children": [],
   "adjacent": [
    {
     "to": "up-dome-plaza",
     "via": "中央通り"
    },
    {
     "to": "up-kuimi",
     "via": "テラス西口"
    }
   ],
   "body": [
    "大桟橋テラスのほぼ中央に、床から腰ほどの高さだけ頭を出した古い杭がある。表面は手でなでられ続けて、つやつやと黒い。これが新都市で最初に打たれた杭で、ここから百年分の床が四方へ広がっていった。住人は、引っ越してきた日と旅立つ日に、この杭に手を置いていく。"
   ]
  },
  {
   "id": "up-kuimi",
   "type": "route",
   "parent": "up-terrace",
   "category": "sightseeing",
   "name": "杭見坂",
   "reading": "くいみざか",
   "en": "Pile-Viewing Slope",
   "tags": [
    "眺望",
    "手仕事",
    "潮の匂い"
   ],
   "access": "open",
   "best_time": "昼",
   "map": {
    "x": 17,
    "y": 30
   },
   "name_origin": "坂を下りながら、新都市を支える杭の林をすぐ近くで見られることから。",
   "summary": "杭の林のあいだを縫って、テラスから市場まで降りていく長い階段。",
   "rumor": "杭の帯をすべて数えた人は、新都市の正しい年齢を知ることができるらしい。まだ誰も数え終わっていない。",
   "layer": "up-city",
   "children": [],
   "adjacent": [
    {
     "to": "up-hatsukui",
     "via": "テラス西口"
    },
    {
     "to": "bd-horo-row",
     "via": "坂の下の桟橋"
    },
    {
     "to": "bd-market"
    }
   ],
   "body": [
    "大桟橋テラスの西の端から、境界の市場へ下りていく木の階段。手すりのすぐ向こうに、新都市を支える杭が林のように並ぶ。杭には、補修された年ごとに色の違う帯が巻かれていて、下るほど古い帯が現れる。水面近くでは、杭いっぱいに付いた濾し貝が、潮に合わせてかすかに口を開け閉めしているのが見える。"
   ]
  },
  {
   "id": "up-lanterns",
   "type": "spot",
   "parent": "up-towers",
   "category": "sightseeing",
   "name": "灯幕通り",
   "reading": "ともしまくどおり",
   "en": "Lantern-Screen Avenue",
   "tags": [
    "ネオン",
    "賑わい",
    "夜が本番",
    "水面の反射"
   ],
   "access": "open",
   "best_time": "夜",
   "map": {
    "x": 64,
    "y": 22
   },
   "art": {
    "day": {
     "src": "assets/img/places/up-lanterns.webp",
     "focus": {
      "x": 50,
      "y": 38
     },
     "ripple": [
      {
       "x": [
        0,
        100
       ],
       "y": [
        66,
        100
       ],
       "power": 0.5
      }
     ],
     "sm": "assets/img/places/up-lanterns-sm.webp",
     "w": 750,
     "h": 1125,
     "smw": 667
    }
   },
   "name_origin": "塔の壁面を覆う表示幕を、住人は昔の「灯り」と「幕」をあわせて灯幕と呼ぶ。それが通りの名前になった。",
   "summary": "塔の壁一面に灯幕が並ぶ大通り。夜は水面まで光の色に染まる。",
   "rumor": "年に一度、すべての幕が同じ青一色になる夜がある。誰がそう決めたのか、知っている人はいない。",
   "layer": "up-city",
   "children": [],
   "adjacent": [
    {
     "to": "up-dome-plaza",
     "via": "渡り廊下"
    },
    {
     "to": "up-shiomi",
     "via": "塔町の大通り"
    },
    {
     "to": "up-horizon",
     "via": "塔の昇降機"
    }
   ],
   "body": [
    "塔町を東西に抜ける大通り。両側の塔の壁を灯幕が覆い、昼は潮位と天気予報、住人が出した伝言や誕生日の祝いを映す。日が落ちると幕はゆっくり色を変えはじめ、その光が桟橋のすき間から水面へ落ちて、境界の市場の天井までほんのり染める。通りの店は夜のほうが賑わう。"
   ]
  },
  {
   "id": "up-shiomi",
   "type": "spot",
   "parent": "up-towers",
   "category": "landmark",
   "name": "潮見塔",
   "reading": "しおみとう",
   "en": "Tide-Watch Tower",
   "tags": [
    "生活感",
    "待ち合わせ",
    "灯り"
   ],
   "access": "open",
   "best_time": "いつでも",
   "map": {
    "x": 21,
    "y": 20
   },
   "name_origin": "壁に縦に走る光の帯が、そのときの潮位を示す。住人はこの塔を見て潮を知る（潮見する）ことから。",
   "summary": "星の紋章を掲げた塔。光の帯で潮の高さを知らせる、街の時計がわり。",
   "rumor": "光の帯が一度だけ、潮と関係なく最上段まで伸びたことがある。その日は街じゅうで、なぜか良いことばかり起きたという。",
   "layer": "up-city",
   "children": [],
   "adjacent": [
    {
     "to": "up-lanterns",
     "via": "塔町の大通り"
    },
    {
     "to": "up-hoshiba",
     "via": "空中回廊"
    }
   ],
   "body": [
    "塔町の西端に立つ、星の紋章を掲げた古い塔。壁を縦に走る光の帯が、潮が満ちれば上へ、引けば下へと、一日かけてゆっくり伸び縮みする。住人は時計を見るようにこの塔を見上げ、「いま七分目だから、舟はまだ出ないね」というふうに話す。塔の足元には、潮見の帯の読み方を記した古い看板が残っている。"
   ]
  },
  {
   "id": "up-horizon",
   "type": "spot",
   "parent": "up-towers",
   "category": "landmark",
   "name": "水平線デッキ",
   "reading": "すいへいせんデッキ",
   "en": "Horizon Deck",
   "tags": [
    "眺望",
    "夕焼け",
    "風の音",
    "ひとり向き"
   ],
   "access": "open",
   "access_note": "強風の日は閉鎖（洗濯物と帽子がよく飛ぶため）",
   "best_time": "夕方",
   "map": {
    "x": 47.5,
    "y": 7.5
   },
   "name_origin": "新都市でいちばん高い展望床。ここからなら、どの方角を向いても水平線が見えることから。",
   "summary": "新都市でいちばん高い場所。遠くの水上町と、沈んだ塔の頭が見渡せる。",
   "rumor": "夕焼けがいちばん赤い日には、水平線の向こうに、まだ沈んでいない昔の新宿が見えることがあるという。",
   "layer": "up-city",
   "children": [],
   "adjacent": [
    {
     "to": "up-lanterns",
     "via": "塔の昇降機"
    }
   ],
   "body": [
    "塔町でいちばん背の高い塔の最上部、アンテナのすぐ下に張られた展望床。足元には新都市の屋根と庭が広がり、その外側は見渡すかぎりの水だ。晴れた日には、遠くに浮かぶほかの水上町や、水面から頭だけ出した昔の高層ビルが、点々と並んで見える。夕方には人が増えるが、誰もあまり喋らない。"
   ]
  },
  {
   "id": "up-rain-garden",
   "type": "spot",
   "parent": "up-gardens",
   "category": "daily",
   "name": "雨受け庭",
   "reading": "あまうけにわ",
   "en": "The Rain-Catching Gardens",
   "tags": [
    "緑",
    "生活感",
    "朝が本番",
    "静けさ"
   ],
   "access": "open",
   "best_time": "朝・雨上がり",
   "map": {
    "x": 85,
    "y": 19.5
   },
   "name_origin": "雨水を受けて溜める庭であることから。新都市では、真水はまず空から受け取るものだった。",
   "summary": "雨水を溜めて野菜を育てる屋上庭園。ベンチで朝ごはんを食べる人が多い。",
   "rumor": "庭のどこかに、雨の味で天気を当てるおばあさんがいる。外れたことはないらしい。",
   "layer": "up-city",
   "children": [],
   "adjacent": [
    {
     "to": "up-hoshiba",
     "via": "屋上の板橋"
    }
   ],
   "body": [
    "段々屋上の東側に広がる庭の連なり。どの庭にも大きな雨受けの桶があり、そこから細い樋で畑へ水が引かれている。育った野菜は、毎朝杭見坂を下って境界の市場へ運ばれていく。雨上がりの朝には、葉の上の滴と送気塔の白い湯気がいっしょに光って、新都市でいちばん静かで明るい場所になる。"
   ]
  },
  {
   "id": "up-hoshiba",
   "type": "spot",
   "parent": "up-gardens",
   "category": "daily",
   "name": "干し場横丁",
   "reading": "ほしばよこちょう",
   "en": "Laundry Lane",
   "tags": [
    "生活感",
    "風通し",
    "懐かしい",
    "猫"
   ],
   "access": "open",
   "best_time": "午前",
   "map": {
    "x": 7,
    "y": 17
   },
   "name_origin": "潮風がよく抜けるので、昔から洗濯物を干す場所として使われてきた路地。いつのまにか小さな店も集まった。",
   "summary": "洗濯物の旗がはためく細い路地。小さな商店と猫が多い。",
   "rumor": "横丁の猫は全部で十三匹。数えるたびにどこかの一匹が入れ替わっている。",
   "layer": "up-city",
   "children": [],
   "adjacent": [
    {
     "to": "up-shiomi",
     "via": "空中回廊"
    },
    {
     "to": "up-rain-garden",
     "via": "屋上の板橋"
    }
   ],
   "body": [
    "段々屋上の西のはずれ、海からの風がまっすぐ抜けてくる細い路地。家々のあいだに張られた紐に洗濯物がはためいて、路地全体が旗の通りのように見える。角には駄菓子屋と修理屋と湯屋があり、どの店先にも猫が一匹ずつ座っている。観光の案内にはほとんど載らないが、新都市の暮らしを知りたい人には、まずここを勧める住人が多い。"
   ]
  },
  {
   "id": "bd-market",
   "type": "layer",
   "parent": "shinjuku",
   "name": "境界エリア・水上マーケット",
   "reading": "きょうかいエリア・すいじょうマーケット",
   "alias": "みぎわ市",
   "en": "The Waterline Market",
   "tags": [
    "賑わい",
    "潮の匂い",
    "湯気",
    "水音"
   ],
   "access": "open",
   "best_time": "朝・夕方",
   "map": {
    "x": 35.5,
    "y": 46.5
   },
   "name_origin": "「汀（みぎわ）」は水際のこと。水面に立つ市場なので、自然とこう呼ばれるようになった。",
   "summary": "水面の高さに浮かぶ市場。上と下と、よその町をつなぐ玄関口。",
   "layer": "bd-market",
   "children": [
    "bd-stalls",
    "bd-rings",
    "bd-harbor"
   ],
   "adjacent": [
    {
     "to": "up-city",
     "via": "杭見坂と荷揚げ昇降機"
    },
    {
     "to": "up-kuimi"
    },
    {
     "to": "lo-old",
     "via": "降り筒"
    }
   ],
   "body": [],
   "essay": {
    "lead": [
     "境界エリアは、上の街と下の街のあいだ、ちょうど水面の高さに広がる市場である。住人は「みぎわ市」と呼ぶ。桟橋と浮き台と小舟が網の目のようにつながり、潮の満ち引きにあわせて、街ごと静かに上下している。"
    ],
    "sections": [
     {
      "heading": "成り立ち",
      "paras": [
       "はじめは、沈みかけたビルの二階から舟へ荷を受け渡す、小さな船着き場にすぎなかった。水位が上がるたびに船着き場は一段ずつ上へ移り、やがて上の住人も下の住人も立ち寄る場所になった。固定された床を持たず、浮き台を継ぎ足して広がったため、境界の地図はなかなか定まらない。いまも毎年、どこかの通りが少しだけ形を変える。"
      ]
     },
     {
      "heading": "見どころ",
      "paras": [
       "幌屋台の通りでは、焼いた魚の煙と湯気が混ざりあう。輪舞台では夕方になると音楽が始まり、覗き床の茶屋では、ガラスの床ごしに真下の旧駅舎の屋根を眺めながら茶が飲める。赤い荷揚げクレーン「赤鶴」は市場のどこからでも見え、待ち合わせの目印になっている。"
      ]
     },
     {
      "heading": "今の姿",
      "paras": [
       "上層の住人にとっては台所、下層で働く人にとっては帰りの寄り道先、よその水上町から来る人にとっては玄関口。境界は三つの役目を同時にこなしている。下層へ降りる降り筒の第一口もここにあり、朝夕には通勤の列と観光客の列が並ぶ。"
      ]
     },
     {
      "heading": "噂と決まりごと",
      "paras": [
       "夕市の灯籠舟は、満月の晩だけ一艘多い、と市場の古株は言う。数え直すと合っているので、誰も困ってはいない。泳ぎ段から先は日没後の遊泳が禁じられているが、理由は、夜の荷舟から泳いでいる人が見えにくいからである。"
      ]
     }
    ]
   }
  },
  {
   "id": "bd-stalls",
   "type": "district",
   "parent": "bd-market",
   "name": "幌屋台桟橋",
   "reading": "ほろやたいさんばし",
   "en": "Awning Pier",
   "tags": [
    "賑わい",
    "湯気",
    "生活感"
   ],
   "access": "open",
   "best_time": "朝・夕方",
   "name_origin": "色とりどりの幌（日除けの布）を張った屋台が、桟橋の上にぎっしり並ぶことから。",
   "summary": "屋台と幌が重なりあう、市場の台所。",
   "layer": "bd-market",
   "children": [
    "bd-horo-row",
    "bd-shizumimono",
    "bd-oyogiba"
   ],
   "adjacent": [
    {
     "to": "bd-rings",
     "via": "浮き橋"
    },
    {
     "to": "bd-harbor",
     "via": "荷車道"
    }
   ],
   "body": [
    "境界の西側に延びる、いちばん古い桟橋の一帯。橙、赤、白の幌が重なって、上から見ると布の屋根がひとつながりの模様になる。朝は上層の菜園の野菜と水上町の魚が並び、夕方は焼き物と汁物の湯気が立つ。"
   ]
  },
  {
   "id": "bd-rings",
   "type": "district",
   "parent": "bd-market",
   "name": "輪の間",
   "reading": "わのま",
   "en": "The Rings",
   "tags": [
    "音楽",
    "水面の反射",
    "夕焼け"
   ],
   "access": "open",
   "best_time": "夕方",
   "name_origin": "円い浮き台がいくつも並び、それらのあいだの水面を人々が「間」と呼んだことから。",
   "summary": "円い浮き台が並ぶ、市場の広場。夕方になると音楽が始まる。",
   "layer": "bd-market",
   "children": [
    "bd-nozoki",
    "bd-ring-stage",
    "bd-lantern"
   ],
   "adjacent": [
    {
     "to": "bd-stalls",
     "via": "浮き橋"
    },
    {
     "to": "bd-harbor",
     "via": "浮き橋"
    }
   ],
   "body": [
    "市場の中ほどに、円形の浮き台が点々と浮かぶ一帯。浮き台どうしは細い浮き橋でつながり、潮に合わせてそれぞれがわずかに違う高さで揺れている。昼は荷さばきの場所、夕方からは人が集まる広場になる。"
   ]
  },
  {
   "id": "bd-harbor",
   "type": "district",
   "parent": "bd-market",
   "name": "舟溜まり",
   "reading": "ふなだまり",
   "en": "The Boat Basin",
   "tags": [
    "手仕事",
    "潮の匂い",
    "賑わい"
   ],
   "access": "open",
   "best_time": "早朝",
   "name_origin": "舟が寄り集まって停まる場所。昔からある普通の言葉が、そのまま地名になった。",
   "summary": "荷舟と水上バスが行き交う、市場の東の港。",
   "layer": "bd-market",
   "children": [
    "bd-crane",
    "bd-waterbus",
    "bd-orizutsu"
   ],
   "adjacent": [
    {
     "to": "bd-stalls",
     "via": "荷車道"
    },
    {
     "to": "bd-rings",
     "via": "浮き橋"
    },
    {
     "to": "up-city",
     "via": "荷揚げ昇降機"
    }
   ],
   "body": [
    "境界の東側に開けた港の一帯。赤い荷揚げクレーンを中心に、荷舟、渡し舟、水上バスがひっきりなしに出入りする。降り筒の第一口もこの一角にあり、市場でいちばん人の流れが速い。"
   ]
  },
  {
   "id": "bd-horo-row",
   "type": "spot",
   "parent": "bd-stalls",
   "category": "daily",
   "name": "幌通り",
   "reading": "ほろどおり",
   "en": "Awning Row",
   "tags": [
    "賑わい",
    "湯気",
    "生活感",
    "潮の匂い"
   ],
   "access": "open",
   "best_time": "夕方",
   "map": {
    "x": 15,
    "y": 48.5
   },
   "art": {
    "day": {
     "src": "assets/img/places/bd-horo-row.webp",
     "focus": {
      "x": 50,
      "y": 34
     },
     "ripple": [
      {
       "x": [
        84,
        100
       ],
       "y": [
        50,
        64
       ],
       "power": 0.5
      }
     ],
     "sm": "assets/img/places/bd-horo-row-sm.webp",
     "w": 750,
     "h": 1125,
     "smw": 667
    }
   },
   "name_origin": "幌屋台桟橋のなかでも、とくに屋台が密に並ぶ一本道。単に「幌の通り」と呼ばれているうちに縮まった。",
   "summary": "焼き魚の煙と汁物の湯気が混ざる、屋台の一本道。",
   "rumor": "いちばん奥の屋台は看板を出していないが、注文すると、その日いちばん欲しかった味が出てくるらしい。",
   "layer": "bd-market",
   "children": [],
   "adjacent": [
    {
     "to": "up-kuimi",
     "via": "坂の下の桟橋"
    },
    {
     "to": "bd-shizumimono",
     "via": "桟橋づたい"
    },
    {
     "to": "bd-oyogiba",
     "via": "階段"
    }
   ],
   "body": [
    "幌屋台桟橋の背骨にあたる一本道。両側に屋台が肩を寄せあい、串焼きの煙と、貝の汁の湯気と、呼び込みの声が同時に流れてくる。上層の住人は仕事帰りに一品だけ買って帰り、下層の潜守たちは長椅子に並んで夕飯を済ませる。桟橋の板のすき間から水面がちらちら見え、落とした串を魚が持っていく。"
   ]
  },
  {
   "id": "bd-shizumimono",
   "type": "spot",
   "parent": "bd-stalls",
   "category": "sightseeing",
   "name": "沈み物市",
   "reading": "しずみものいち",
   "en": "The Sunken Goods Market",
   "tags": [
    "懐かしい",
    "手仕事",
    "ひとり向き"
   ],
   "access": "open",
   "best_time": "午後",
   "map": {
    "x": 26.5,
    "y": 45
   },
   "name_origin": "下層の手入れの途中で出てきた古い品、「沈み物」を売り買いする市であることから。",
   "summary": "下層から上がってきた古い品を売る露店。古い切符、看板の文字、時計。",
   "rumor": "看板の文字を全部買い集めると、昔の新宿のどこかの店の名前がひとつ完成する、と言われている。",
   "layer": "bd-market",
   "children": [],
   "adjacent": [
    {
     "to": "bd-horo-row",
     "via": "桟橋づたい"
    },
    {
     "to": "bd-nozoki",
     "via": "浮き橋"
    }
   ],
   "body": [
    "潜守たちが建物を手入れするとき、壁の裏や床下から出てきた古い品は、まずここへ運ばれる。古い切符、看板から外れた一文字、止まった腕時計、どこかの店の鍵。どれも丁寧に洗われて、小さな札をつけて並べられている。売り手の多くは元潜守で、品物がどの建物の何階から出てきたかを、尋ねればいくらでも話してくれる。"
   ]
  },
  {
   "id": "bd-nozoki",
   "type": "spot",
   "parent": "bd-rings",
   "category": "sightseeing",
   "name": "覗き床茶屋",
   "reading": "のぞきどこぢゃや",
   "en": "The Glass-Floor Teahouse",
   "tags": [
    "静けさ",
    "木漏れ日の水",
    "眺望",
    "ひとり向き"
   ],
   "access": "open",
   "best_time": "昼",
   "map": {
    "x": 40,
    "y": 44.5
   },
   "art": {
    "day": {
     "src": "assets/img/places/bd-nozoki.webp",
     "focus": {
      "x": 57,
      "y": 45
     },
     "ripple": [
      {
       "x": [
        40,
        100
       ],
       "y": [
        52,
        88
       ],
       "power": 0.9
      }
     ],
     "sm": "assets/img/places/bd-nozoki-sm.webp",
     "w": 750,
     "h": 1125,
     "smw": 667
    }
   },
   "name_origin": "床の一部がガラス張りで、真下の水中を覗けることから。",
   "summary": "ガラスの床ごしに、真下の旧駅舎を眺めながらお茶が飲める。",
   "rumor": "ガラスの床をじっと見ていると、下の大広間からこちらを見上げている人と目が合うことがある。たいていは手を振ってくれる。",
   "layer": "bd-market",
   "children": [],
   "adjacent": [
    {
     "to": "bd-shizumimono",
     "via": "浮き橋"
    },
    {
     "to": "bd-ring-stage",
     "via": "浮き橋"
    },
    {
     "to": "lo-concourse",
     "via": "床の真下"
    }
   ],
   "body": [
    "青い屋根が目印の茶屋。座敷の床の半分が厚いガラスになっていて、その真下には沈んだ旧駅舎の屋根が、緑の苔をまとって横たわっている。昼どきには光がまっすぐ水に差し込み、屋根の上を魚の群れが影を落としながら通り過ぎていく。名物は濾し貝の出汁で炊いた粥。急いでいる人は来ない店だ。"
   ]
  },
  {
   "id": "bd-ring-stage",
   "type": "spot",
   "parent": "bd-rings",
   "category": "sightseeing",
   "name": "輪舞台",
   "reading": "わぶたい",
   "en": "The Ring Stage",
   "tags": [
    "音楽",
    "夕焼け",
    "賑わい",
    "夜が本番"
   ],
   "access": "open",
   "best_time": "夕方〜夜",
   "map": {
    "x": 56,
    "y": 41
   },
   "name_origin": "輪の間でいちばん大きな円い浮き台。いつからか、ここで演奏や踊りが行われるようになった。",
   "summary": "円い大きな浮き台。夕暮れになると、誰からともなく演奏が始まる。",
   "rumor": "満潮と日没が重なる日には、舞台の下の水の中からも拍手が聞こえるという。",
   "layer": "bd-market",
   "children": [],
   "adjacent": [
    {
     "to": "bd-nozoki",
     "via": "浮き橋"
    },
    {
     "to": "bd-lantern",
     "via": "舟で"
    },
    {
     "to": "bd-orizutsu",
     "via": "浮き橋"
    }
   ],
   "body": [
    "輪の間でいちばん大きな、二重の柵をめぐらせた円形の浮き台。昼は荷さばきに使われ、日が傾くと、誰からともなく楽器を持った人が集まってくる。演目は決まっていない。上層の学生の合奏の日もあれば、水上町から来た旅芸人の日もある。潮が動くと舞台全体がゆっくり上下し、それに合わせて踊る「潮踊り」は、境界でしか見られない。"
   ]
  },
  {
   "id": "bd-lantern",
   "type": "spot",
   "parent": "bd-rings",
   "category": "mystic",
   "name": "灯籠舟の夕市",
   "reading": "とうろうぶねのゆういち",
   "en": "The Lantern-Boat Evening Market",
   "tags": [
    "灯り",
    "水面の反射",
    "夜が本番",
    "神秘"
   ],
   "access": "open",
   "best_time": "日没後",
   "map": {
    "x": 50,
    "y": 52.5
   },
   "art": {
    "default": {
     "src": "assets/img/places/bd-lantern.webp",
     "focus": {
      "x": 50,
      "y": 42
     },
     "ripple": [
      {
       "x": [
        0,
        100
       ],
       "y": [
        52,
        100
       ],
       "power": 1.0
      }
     ],
     "sm": "assets/img/places/bd-lantern-sm.webp",
     "w": 1000,
     "h": 1500,
     "smw": 667
    }
   },
   "name_origin": "日が沈むと、灯籠を吊るした小舟が集まって市を開くことから。",
   "summary": "日没とともに、灯籠を吊るした小舟が集まって開く水の上の夜市。",
   "rumor": "満月の晩だけ、灯籠舟が一艘多い。数え直すと合っているので、誰も困ってはいない。",
   "layer": "bd-market",
   "children": [],
   "adjacent": [
    {
     "to": "bd-ring-stage",
     "via": "舟で"
    },
    {
     "to": "bd-waterbus",
     "via": "舟で"
    }
   ],
   "body": [
    "日没の鐘が鳴ると、輪の間の南の水面に、灯籠を吊るした小舟がどこからともなく集まってくる。舟と舟は舷を寄せて一つの通りになり、客は舟から舟へと渡り歩いて買い物をする。売り物は甘い物、小さな灯り、手紙用の紙、そして下層の灯魚を模した飴細工。灯籠の光は澄んだ水を通って下層まで届き、旧駅舎の屋根の上に、ゆらゆらとした光の模様を落とす。"
   ]
  },
  {
   "id": "bd-crane",
   "type": "spot",
   "parent": "bd-harbor",
   "category": "landmark",
   "name": "赤鶴の荷揚げ場",
   "reading": "あかづるのにあげば",
   "en": "The Red Crane Dock",
   "tags": [
    "手仕事",
    "待ち合わせ",
    "賑わい"
   ],
   "access": "open",
   "best_time": "早朝",
   "map": {
    "x": 79,
    "y": 41
   },
   "art": {
    "default": {
     "src": "assets/img/places/bd-crane.webp",
     "focus": {
      "x": 45,
      "y": 33
     },
     "ripple": [
      {
       "x": [
        0,
        42
       ],
       "y": [
        78,
        100
       ],
       "power": 0.9
      },
      {
       "x": [
        42,
        100
       ],
       "y": [
        60,
        100
       ],
       "power": 0.9
      }
     ],
     "sm": "assets/img/places/bd-crane-sm.webp",
     "w": 1000,
     "h": 1500,
     "smw": 667
    }
   },
   "name_origin": "赤く塗られた荷揚げクレーンが、長い首を伸ばす鶴に見えることから、赤鶴と呼ばれる。",
   "summary": "赤いクレーンが立つ荷揚げ場。市場のどこからでも見える、待ち合わせの目印。",
   "rumor": "赤鶴は年に一度、誰も操作していないのに、首を北へ向けている朝がある。その年は豊漁になるらしい。",
   "layer": "bd-market",
   "children": [],
   "adjacent": [
    {
     "to": "bd-waterbus",
     "via": "桟橋"
    },
    {
     "to": "bd-orizutsu",
     "via": "桟橋"
    }
   ],
   "body": [
    "舟溜まりの真ん中に、赤く塗られた背の高い荷揚げクレーンが立つ。水上町から届いた荷や、下層から上げられた資材を、長い首でゆっくりと桟橋へ下ろしていく。早朝の荷揚げは見物人が出るほどの手際で、合図の笛と腕の動きだけで、重い木箱が寸分違わず台車に収まる。「赤鶴の足元で」は、「ドームの下で」に並ぶ待ち合わせの決まり文句だ。"
   ]
  },
  {
   "id": "bd-waterbus",
   "type": "route",
   "parent": "bd-harbor",
   "category": "daily",
   "name": "水上バスのりば",
   "reading": "すいじょうバスのりば",
   "en": "Water Bus Terminal",
   "tags": [
    "生活感",
    "潮の匂い",
    "風通し"
   ],
   "access": "open",
   "best_time": "いつでも",
   "map": {
    "x": 82,
    "y": 45.5
   },
   "name_origin": "昔の陸の「バス」の呼び名を、そのまま水の上の乗合舟に引き継いだ。",
   "summary": "ほかの水上町へ向かう乗合舟の発着所。新宿の玄関口。",
   "rumor": "時刻表のいちばん下に、行き先の書かれていない便が一本だけ載っている。乗った人の話は、なぜか誰に聞いても楽しそうだ。",
   "layer": "bd-market",
   "children": [],
   "adjacent": [
    {
     "to": "bd-lantern",
     "via": "舟で"
    },
    {
     "to": "bd-crane",
     "via": "桟橋"
    }
   ],
   "body": [
    "舟溜まりの東端にある、屋根つきの発着所。白い船体に青い線の水上バスが、ほかの水上町や、水面に頭を出した遠くの塔の町を結んでいる。待合所の壁には、潮の時刻に合わせて少しずつずれていく時刻表が貼られ、乗る人はまず潮見塔の帯を確かめてから時刻表を見る。初めて新宿に来た人の多くは、ここで赤鶴を見上げるところから旅が始まる。"
   ]
  },
  {
   "id": "bd-orizutsu",
   "type": "route",
   "parent": "bd-harbor",
   "category": "landmark",
   "name": "降り筒・第一口",
   "reading": "おりづつ・だいいちぐち",
   "en": "The Descent Tube, Gate One",
   "tags": [
    "木漏れ日の水",
    "神秘",
    "待ち合わせ"
   ],
   "access": "open",
   "best_time": "朝・夕方（通勤の時間は混む）",
   "map": {
    "x": 73.5,
    "y": 41.5
   },
   "art": {
    "morning": {
     "src": "assets/img/places/bd-orizutsu-morning.webp",
     "focus": {
      "x": 50,
      "y": 38
     },
     "ripple": [
      {
       "x": [
        0,
        36
       ],
       "y": [
        33,
        100
       ],
       "power": 0.8
      },
      {
       "x": [
        62,
        100
       ],
       "y": [
        33,
        100
       ],
       "power": 0.8
      }
     ],
     "sm": "assets/img/places/bd-orizutsu-morning-sm.webp",
     "w": 1024,
     "h": 1536,
     "smw": 667
    }
   },
   "name_origin": "水面から下層へまっすぐ降りる筒状の昇降機であることから。最初に作られた一本なので「第一口」。",
   "summary": "水面から下層の旧駅舎へ、ガラスの筒でまっすぐ降りる昇降機。",
   "rumor": "籠の中でいちど目を閉じて数を十まで数えると、降りきったとき、ほんの少しだけ違う階に着いている気がするという。",
   "layer": "bd-market",
   "children": [],
   "adjacent": [
    {
     "to": "bd-ring-stage",
     "via": "浮き橋"
    },
    {
     "to": "bd-crane",
     "via": "桟橋"
    },
    {
     "to": "lo-concourse",
     "via": "降り筒"
    },
    {
     "to": "lo-old",
     "via": "降り筒"
    }
   ],
   "body": [
    "境界の塔に掲げられた大きな看板が入口の目印。乗り場から乗り込むガラスの籠は、水面を抜けて、ゆっくりと下層の旧駅舎の大広間まで降りていく。降りるあいだ、籠の外では光が青から緑へと色を変え、杭に群れる魚がすぐそばをかすめていく。朝夕は通勤の住人で混み、昼は初めて下層へ降りる観光客で混む。料金はかからない。"
   ]
  },
  {
   "id": "bd-oyogiba",
   "type": "spot",
   "parent": "bd-stalls",
   "category": "daily",
   "name": "泳ぎ段",
   "reading": "およぎだん",
   "en": "The Swimming Steps",
   "tags": [
    "子ども連れ",
    "水音",
    "木漏れ日の水",
    "朝が本番"
   ],
   "access": "limited",
   "access_note": "日没後は遊泳禁止（夜の荷舟から泳ぐ人が見えにくいため）",
   "best_time": "午前",
   "map": {
    "x": 12.5,
    "y": 53
   },
   "name_origin": "桟橋の端から水の中へ、段々に下りていく石段。泳ぎに入るための段であることから。",
   "summary": "桟橋から水の中へ下りていく石段。子どもたちの泳ぎ場で、潜り始めの場所。",
   "rumor": "段をいちばん下まで数えた子どもはまだいない。途中で、いつも魚の群れに数をわからなくされるからだ。",
   "layer": "bd-market",
   "children": [],
   "adjacent": [
    {
     "to": "bd-horo-row",
     "via": "階段"
    }
   ],
   "body": [
    "幌屋台桟橋の南の端で、石段が水の中まで続いている。昔のビルの外階段をそのまま使ったもので、水の中でも段がずっと下へ続いているのが見える。朝は子どもたちの泳ぎ場で、昼は潜りを習う人の練習場になる。水が澄んでいるので、段に腰かけて足をつけているだけでも、ずっと下にある旧新宿の屋根が見える。"
   ]
  },
  {
   "id": "lo-old",
   "type": "layer",
   "parent": "shinjuku",
   "name": "旧新宿",
   "reading": "きゅうしんじゅく",
   "alias": "底宿",
   "en": "Old Shinjuku, Below",
   "tags": [
    "木漏れ日の水",
    "静けさ",
    "懐かしい",
    "神秘"
   ],
   "access": "open",
   "best_time": "正午・夜",
   "map": {
    "x": 35.2,
    "y": 70.4
   },
   "name_origin": "正式名は「旧新宿」。住人は親しみを込めて「底宿（そこじゅく）」と呼ぶ。「新宿」を縮めた「宿」に、水の底の「底」をかぶせた言葉遊びで、悪い意味はない。",
   "summary": "封水された旧市街。窓の外を魚が泳ぐ、水底の公共の街。",
   "layer": "lo-old",
   "children": [
    "lo-station",
    "lo-rails",
    "lo-towers"
   ],
   "adjacent": [
    {
     "to": "bd-market",
     "via": "降り筒"
    },
    {
     "to": "bd-orizutsu",
     "via": "降り筒"
    }
   ],
   "body": [],
   "essay": {
    "lead": [
     "下層は、かつての新宿駅とその周辺が、そのまま水の底に眠る区域である。住人は親しみを込めて「底宿（そこじゅく）」と呼ぶ。沈んだ街は廃墟ではない。多くの建物は封水と呼ばれる防水改修を受け、内部に空気を保ったまま、今も人が出入りしている。"
    ],
    "sections": [
     {
      "heading": "成り立ち",
      "paras": [
       "沈下がゆっくりだったことは、下層にとって幸運だった。住人には、手放す建物と残す建物を選ぶ時間があった。残すと決めた駅舎やビルは窓を厚いガラスに替え、継ぎ目を塞ぎ、送気塔から空気を送る仕組みを整えた。こうして旧新宿は、水に満たされた外側と、空気に満たされた内側を持つ、二重の街になった。"
      ]
     },
     {
      "heading": "見どころ",
      "paras": [
       "旧駅舎の大広間は、窓の外を魚の群れが横切る巨大な水中回廊として開放されている。透き廊と呼ばれるガラスの通路は沈んだ線路に沿って塔のあいだを結び、頭上では光がゆらぐ。夜になると灯魚の塔がほのかに光り、正午には光井戸に陽が真上から落ちてくる。入館料はなく、ほとんどの場所は誰でも自由に歩ける。"
      ]
     },
     {
      "heading": "今の姿",
      "paras": [
       "下層は見に来る場所であると同時に、働く場所でもある。底郵便局は今も手紙を受け付けている。潜守と呼ばれる職人たちは毎朝、建物の継ぎ目を点検し、杭に付く濾し貝の具合を確かめる。水が澄んでいるのは、彼らと貝たちの仕事のおかげだ。"
      ]
     },
     {
      "heading": "噂と決まりごと",
      "paras": [
       "いちばん深い旧ホームは、保全区域として立ち入りが制限されている。濾し貝の苗床になっていて、ここで育った貝が街じゅうの杭へ移されていく。それでも、そこで発車ベルが一度だけ鳴るのを聞いた、という潜守は少なくない。"
      ]
     }
    ]
   }
  },
  {
   "id": "lo-station",
   "type": "district",
   "parent": "lo-old",
   "name": "旧駅舎区",
   "reading": "きゅうえきしゃく",
   "en": "The Old Station Ward",
   "tags": [
    "懐かしい",
    "木漏れ日の水",
    "賑わい"
   ],
   "access": "open",
   "best_time": "昼",
   "name_origin": "沈む前の大きな駅舎と、それを囲む建物の一帯。駅としての役目は終えたが、「駅」と呼ぶのをやめた人はいない。",
   "summary": "沈んだ大駅舎を中心とする、下層の玄関。",
   "layer": "lo-old",
   "children": [
    "lo-concourse",
    "lo-light-well"
   ],
   "adjacent": [
    {
     "to": "lo-rails",
     "via": "透き廊"
    },
    {
     "to": "lo-towers",
     "via": "透き廊"
    }
   ],
   "body": [
    "かつて一日に何百万人もが行き交った駅舎が、苔と海藻をまとってそのまま眠る一帯。主要な建物はすべて封水され、降り筒の第一口がその中心に降りてくる。下層を訪ねる人の多くは、まずここから歩きはじめる。"
   ]
  },
  {
   "id": "lo-rails",
   "type": "district",
   "parent": "lo-old",
   "name": "沈線回廊",
   "reading": "ちんせんかいろう",
   "en": "The Sunken Rail Corridor",
   "tags": [
    "静けさ",
    "懐かしい",
    "ひとり向き"
   ],
   "access": "open",
   "best_time": "午後",
   "name_origin": "沈んだ線路が谷のように続く一帯。その上をガラスの通路が走ることから「回廊」と呼ばれる。",
   "summary": "沈んだ線路と車両が眠る谷。ガラスの回廊から眺める。",
   "layer": "lo-old",
   "children": [
    "lo-sukiro",
    "lo-train-gallery",
    "lo-moss-arcade",
    "lo-deep-platform"
   ],
   "adjacent": [
    {
     "to": "lo-station",
     "via": "透き廊"
    },
    {
     "to": "lo-towers",
     "via": "透き廊"
    }
   ],
   "body": [
    "駅舎の南へ、何本もの線路が水底を平行に延びていく。車両の何台かは線路の上にそのまま残り、魚と海藻の住まいになっている。回廊は静かで、足音と、送気の小さな音しか聞こえない。"
   ]
  },
  {
   "id": "lo-towers",
   "type": "district",
   "parent": "lo-old",
   "name": "沈楼街",
   "reading": "ちんろうがい",
   "en": "The Drowned Towers",
   "tags": [
    "神秘",
    "灯り",
    "夜が本番"
   ],
   "access": "open",
   "best_time": "夜",
   "name_origin": "沈んだ高い建物（楼）が並ぶ街並みであることから。",
   "summary": "沈んだビルが並ぶ一帯。夜になると、光る魚が窓を灯す。",
   "layer": "lo-old",
   "children": [
    "lo-post",
    "lo-quiet-hall",
    "lo-hikari-tower",
    "lo-diving-school"
   ],
   "adjacent": [
    {
     "to": "lo-station",
     "via": "透き廊"
    },
    {
     "to": "lo-rails",
     "via": "透き廊"
    }
   ],
   "body": [
    "駅舎の東と西に並ぶ、沈んだビルの街並み。封水されたビルの中には、郵便局や教室や展示室が入っている。夜になると窓という窓に灯りがともり、水の中に、もうひとつの夜景が浮かび上がる。"
   ]
  },
  {
   "id": "lo-concourse",
   "type": "spot",
   "parent": "lo-station",
   "category": "landmark",
   "name": "旧駅舎大広間",
   "reading": "きゅうえきしゃおおひろま",
   "en": "The Old Station Concourse",
   "tags": [
    "木漏れ日の水",
    "懐かしい",
    "賑わい",
    "青い光"
   ],
   "access": "open",
   "best_time": "昼",
   "map": {
    "x": 47.5,
    "y": 71.5
   },
   "art": {
    "morning": {
     "src": "assets/img/places/lo-concourse-morning.webp",
     "focus": {
      "x": 50,
      "y": 43
     },
     "ripple": [
      {
       "x": [
        0,
        100
       ],
       "y": [
        62,
        100
       ],
       "power": 0.8
      }
     ],
     "sm": "assets/img/places/lo-concourse-morning-sm.webp",
     "w": 1000,
     "h": 1500,
     "smw": 667
    }
   },
   "name_origin": "昔の駅のコンコース（中央通路）を、封水して広間として開いたことから。",
   "summary": "窓の外を魚が横切る、駅舎まるごとの水中回廊。下層の顔。",
   "rumor": "発車標のひとつは、ときどき勝手に行き先を表示する。表示される駅名は、いまの地図のどこにもない。",
   "layer": "lo-old",
   "children": [],
   "adjacent": [
    {
     "to": "bd-nozoki",
     "via": "床の真下"
    },
    {
     "to": "bd-orizutsu",
     "via": "降り筒"
    },
    {
     "to": "lo-sukiro",
     "via": "南口"
    },
    {
     "to": "lo-post",
     "via": "西口通路"
    },
    {
     "to": "lo-light-well",
     "via": "天窓の下"
    }
   ],
   "body": [
    "降り筒を降りると、そこは沈んだ駅舎の中央通路だ。天井は高く、壁の窓はすべて厚いガラスに替えられ、外では魚の群れが列車のように横切っていく。昔の発車標や柱の案内板は外されずに残され、手入れされて、うっすらと青い光の中に浮かんでいる。入館料はなく、ベンチに座って一日じゅう水を眺めている人もいる。昼どき、天窓から差す光が床に揺れる模様は、下層でいちばん多く絵に描かれてきた。"
   ]
  },
  {
   "id": "lo-light-well",
   "type": "spot",
   "parent": "lo-station",
   "category": "mystic",
   "name": "光井戸",
   "reading": "ひかりいど",
   "en": "The Light Well",
   "tags": [
    "木漏れ日の水",
    "静けさ",
    "神秘",
    "ひとり向き"
   ],
   "access": "open",
   "best_time": "正午",
   "map": {
    "x": 50,
    "y": 59
   },
   "art": {
    "day": {
     "src": "assets/img/places/lo-light-well.webp",
     "focus": {
      "x": 50,
      "y": 38
     },
     "ripple": [
      {
       "x": [
        0,
        100
       ],
       "y": [
        78,
        100
       ],
       "power": 0.9
      }
     ],
     "sm": "assets/img/places/lo-light-well-sm.webp",
     "w": 750,
     "h": 1125,
     "smw": 667
    }
   },
   "name_origin": "ビルの谷間が井戸のように縦に抜けていて、そこへ陽の光が汲み込まれるように落ちてくることから。",
   "summary": "正午だけ、陽の光が真上から水底まで落ちてくる場所。",
   "rumor": "光の柱の中に入った手紙は、宛名がなくても届くべき人に届く、と言われている。",
   "layer": "lo-old",
   "children": [],
   "adjacent": [
    {
     "to": "lo-concourse",
     "via": "天窓の下"
    }
   ],
   "body": [
    "駅舎の北側で、周りのビルがちょうど四角い筒のように囲んでいる場所がある。正午の前後わずかな時間、太陽がその真上に来ると、光の柱が水面から水底までまっすぐ降りてくる。封水された展望室の床に立つと、光の柱の中を、細かな泡と小さな魚がゆっくり昇っていくのが見える。正午になると、静かに人が集まってきて、光が傾くとまた静かに去っていく。"
   ]
  },
  {
   "id": "lo-sukiro",
   "type": "route",
   "parent": "lo-rails",
   "category": "sightseeing",
   "name": "透き廊",
   "reading": "すきろう",
   "en": "The Clear Corridor",
   "tags": [
    "木漏れ日の水",
    "青い光",
    "静けさ"
   ],
   "access": "open",
   "best_time": "午後",
   "map": {
    "x": 55,
    "y": 76.5
   },
   "name_origin": "壁も天井も透き通ったガラスの廊下であることから。",
   "summary": "沈んだ線路に沿って建物どうしを結ぶ、ガラスの通路。",
   "rumor": "回廊の中ほどで立ち止まって耳を澄ますと、昔の駅の構内放送が、水を通してかすかに聞こえるという。",
   "layer": "lo-old",
   "children": [],
   "adjacent": [
    {
     "to": "lo-concourse",
     "via": "南口"
    },
    {
     "to": "lo-train-gallery",
     "via": "回廊の南端"
    },
    {
     "to": "lo-hikari-tower",
     "via": "東の分かれ道"
    }
   ],
   "body": [
    "駅舎の南口から、沈んだ線路の上をまっすぐ延びるガラスの通路。壁も天井も透明で、歩いていると水の中を散歩しているような気分になる。頭上では光がゆらぎ、足もとでは苔むしたレールが谷のように続く。魚たちは通路に慣れていて、ガラスのすぐ向こうで並んで泳ぐ。ところどころに腰掛けがあり、潜守がガラスを磨いているのに出くわすこともある。"
   ]
  },
  {
   "id": "lo-train-gallery",
   "type": "spot",
   "parent": "lo-rails",
   "category": "sightseeing",
   "name": "眠り車両の展示室",
   "reading": "ねむりしゃりょうのてんじしつ",
   "en": "The Sleeping Railcars Gallery",
   "tags": [
    "懐かしい",
    "静けさ",
    "青い光",
    "子ども連れ"
   ],
   "access": "open",
   "best_time": "午後",
   "map": {
    "x": 60,
    "y": 87.5
   },
   "name_origin": "線路の上で止まったまま眠っている車両を、封水した旧ホームの窓から眺める展示室。",
   "summary": "線路の上で眠る昔の車両を、ホームの窓から間近に眺める展示室。",
   "rumor": "いちばん端の車両だけは、車内の灯りが消えたことがないという。電気は、どこからも来ていないはずなのに。",
   "layer": "lo-old",
   "children": [],
   "adjacent": [
    {
     "to": "lo-sukiro",
     "via": "回廊の南端"
    },
    {
     "to": "lo-moss-arcade",
     "via": "線路沿いの通路"
    },
    {
     "to": "lo-deep-platform",
     "via": "保全区域の手前まで"
    }
   ],
   "body": [
    "沈線回廊の南端、封水された旧ホームが細長い展示室になっている。窓のすぐ外の線路には、昔の車両が何両も、止まったときのまま並んでいる。車内はいまや魚と海藻の住まいで、座席には貝が並び、吊り革の輪を小魚がくぐっていく。窓辺の札には、それぞれの車両がどこからどこへ走っていたかが書かれていて、子どもたちは札と窓を見比べながら行ったり来たりする。"
   ]
  },
  {
   "id": "lo-moss-arcade",
   "type": "spot",
   "parent": "lo-rails",
   "category": "mystic",
   "name": "苔の地下街",
   "reading": "こけのちかがい",
   "en": "The Moss Arcade",
   "tags": [
    "緑",
    "静けさ",
    "神秘",
    "発光"
   ],
   "access": "limited",
   "access_note": "潜守の案内つきで入る（通路が入り組んでいて迷いやすいため）",
   "best_time": "夕方",
   "map": {
    "x": 41.5,
    "y": 87
   },
   "name_origin": "昔の地下商店街。沈んだあと、天井から床まで苔に覆われたことから。",
   "summary": "苔に覆われた昔の地下商店街。ほのかに緑に光る通路を、案内つきで歩く。",
   "rumor": "案内の潜守は、毎回少しずつ違う道を通る。それでも必ず同じ出口に着くのが、いちばん不思議なところだ。",
   "layer": "lo-old",
   "children": [],
   "adjacent": [
    {
     "to": "lo-train-gallery",
     "via": "線路沿いの通路"
    }
   ],
   "body": [
    "駅舎の地下に広がっていた昔の商店街。封水された通路の内側はしっとりと湿り、壁も天井も、柔らかな苔に覆われている。この苔は暗がりでほのかに緑の光を帯びる性質があり、灯りを落とすと、通路全体がぼんやりと浮かび上がる。店の看板や陳列棚もそのまま残っていて、苔の下から昔の店の名前が少しだけ透けて見える。通路が入り組んでいるので、入るのは潜守の案内つきの回だけだ。"
   ]
  },
  {
   "id": "lo-deep-platform",
   "type": "spot",
   "parent": "lo-rails",
   "category": "mystic",
   "name": "最深ホーム",
   "reading": "さいしんホーム",
   "en": "The Deepest Platform",
   "tags": [
    "静けさ",
    "神秘",
    "青い光"
   ],
   "access": "closed",
   "access_note": "保全区域（濾し貝の苗床があるため）。眠り車両の展示室の窓から一部を眺められる",
   "best_time": "—",
   "map": {
    "x": 44,
    "y": 93
   },
   "name_origin": "旧新宿でいちばん深いところにある、昔の地下ホーム。",
   "summary": "いちばん深い旧ホーム。濾し貝の苗床で、立ち入りは潜守だけ。",
   "rumor": "苗床の世話をしていると、発車ベルが一度だけ鳴るのを聞くことがある。聞いた潜守は、その年いちばんの貝を育てるという。",
   "layer": "lo-old",
   "children": [],
   "adjacent": [
    {
     "to": "lo-train-gallery",
     "via": "保全区域の手前まで"
    }
   ],
   "body": [
    "旧新宿でいちばん深い場所にある、昔の地下ホーム。水温が一年じゅう変わらないため、濾し貝の苗床として使われている。ここで育った若い貝は、潜守の手で街じゅうの杭へ移され、やがて新宿の水を澄ませる仕事を始める。言ってみれば、街の水の生まれる場所だ。立ち入りは潜守だけに限られているが、眠り車両の展示室のいちばん奥の窓から、青く沈んだホームの端を眺めることができる。"
   ]
  },
  {
   "id": "lo-post",
   "type": "spot",
   "parent": "lo-towers",
   "category": "daily",
   "name": "底郵便局",
   "reading": "そこゆうびんきょく",
   "en": "The Bottom Post Office",
   "tags": [
    "生活感",
    "懐かしい",
    "手仕事"
   ],
   "access": "open",
   "best_time": "午前",
   "map": {
    "x": 27.5,
    "y": 72
   },
   "name_origin": "水底にある郵便局。底宿の「底」をそのまま冠した。",
   "summary": "今も営業している水底の郵便局。魚の消印が押せる。",
   "rumor": "局の奥には、宛先不明のまま百年待っている手紙の棚がある。ときどき、それを受け取りに来る人がいる。",
   "layer": "lo-old",
   "children": [],
   "adjacent": [
    {
     "to": "lo-concourse",
     "via": "西口通路"
    },
    {
     "to": "lo-quiet-hall",
     "via": "裏通路"
    }
   ],
   "body": [
    "駅舎の西隣、丸い看板を掲げた封水ビルの一階で、今も郵便局が営業している。手紙や小包は気送管の筒に入れられ、空気の力で上層まで一気に送られていく。窓口では、ここでしか押せない魚の形の消印が人気で、観光客は自分宛てに絵葉書を出していく。局員は全員、潜りの心得がある。管が詰まると、自分たちで外から直しに行くからだ。"
   ]
  },
  {
   "id": "lo-quiet-hall",
   "type": "spot",
   "parent": "lo-towers",
   "category": "mystic",
   "name": "無音の間",
   "reading": "むおんのま",
   "en": "The Hall of No Sound",
   "tags": [
    "静けさ",
    "神秘",
    "ひとり向き",
    "青い光"
   ],
   "access": "limited",
   "access_note": "室内では会話禁止（静けさを守るため）",
   "best_time": "いつでも",
   "map": {
    "x": 17,
    "y": 73
   },
   "name_origin": "中に入ると、外の音も自分の声も、ふっと遠くなることから。",
   "summary": "音がすっと消える、青い大広間。ここでは誰も話さない。",
   "rumor": "ここで一度だけ声を出すと、それは上層の誰かの夢の中で聞こえる、と言われている。だから誰も話さない。",
   "layer": "lo-old",
   "children": [],
   "adjacent": [
    {
     "to": "lo-post",
     "via": "裏通路"
    }
   ],
   "body": [
    "西の沈楼街の外れ、古いビルの吹き抜けを封水した大きな部屋。厚いガラスと水と壁のつくりが重なって、中に入ると外の音がほとんど聞こえなくなる。部屋の中では会話をしない決まりで、訪れた人は窓辺に座り、青い光の中を魚が横切るのをただ眺める。考えごとをしたい住人や、眠れない夜を過ごす人が、静かに出入りしている。"
   ]
  },
  {
   "id": "lo-hikari-tower",
   "type": "spot",
   "parent": "lo-towers",
   "category": "mystic",
   "name": "灯魚の塔",
   "reading": "ひうおのとう",
   "en": "The Glowfish Tower",
   "tags": [
    "発光",
    "夜が本番",
    "神秘",
    "青い光"
   ],
   "access": "open",
   "best_time": "夜",
   "map": {
    "x": 69,
    "y": 74.5
   },
   "art": {
    "night": {
     "src": "assets/img/places/lo-hikari-tower-night.webp",
     "focus": {
      "x": 58,
      "y": 36
     },
     "ripple": [
      {
       "x": [
        0,
        100
       ],
       "y": [
        75,
        100
       ],
       "power": 1.0
      }
     ],
     "sm": "assets/img/places/lo-hikari-tower-night-sm.webp",
     "w": 1000,
     "h": 1500,
     "smw": 667
    }
   },
   "name_origin": "量販店だった高いビルに、夜に光る小魚・灯魚が棲みついたことから。",
   "summary": "灯魚が棲む塔。夜になると、窓という窓がほのかに光る。",
   "rumor": "灯魚の光は、上の街で灯幕が明るい夜ほど強くなる。上と下で、光の挨拶をしているのだという。",
   "layer": "lo-old",
   "children": [],
   "adjacent": [
    {
     "to": "lo-sukiro",
     "via": "東の分かれ道"
    },
    {
     "to": "lo-diving-school",
     "via": "東の通路"
    }
   ],
   "body": [
    "駅舎の東に立つ、沈む前は大きな量販店だった塔。外側に残る赤い看板の下、ひとつひとつの窓の奥に、灯魚と呼ばれる小魚が群れで棲んでいる。日が沈むと灯魚はいっせいに淡い青白い光を帯び、塔の窓がひとつ、またひとつと灯っていく。封水された中層階の展望室からは、光る群れが窓の外を渦を巻いて昇っていくのが見える。下層の夜景の主役は、この塔だ。"
   ]
  },
  {
   "id": "lo-diving-school",
   "type": "spot",
   "parent": "lo-towers",
   "category": "daily",
   "name": "潜守の詰所と潜り教室",
   "reading": "せんしゅのつめしょともぐりきょうしつ",
   "en": "The Keepers' Station & Diving School",
   "tags": [
    "手仕事",
    "生活感",
    "子ども連れ"
   ],
   "access": "open",
   "best_time": "朝",
   "map": {
    "x": 88,
    "y": 77
   },
   "name_origin": "潜守たちの詰所と、潜りを教える教室が、同じ建物に入っていることから。",
   "summary": "街を手入れする職人・潜守の拠点。潜りの初心者教室も開いている。",
   "rumor": "詰所の点検表には、どの建物にも載っていない部屋がひとつだけ記されている。古い潜守は「あれは点検しなくていい部屋だ」と笑う。",
   "layer": "lo-old",
   "children": [],
   "adjacent": [
    {
     "to": "lo-hikari-tower",
     "via": "東の通路"
    }
   ],
   "body": [
    "東の沈楼街の端、小さな封水ビルに、潜守たちの詰所がある。毎朝ここで点検の持ち場が割り振られ、潜守たちは道具袋を下げて、それぞれの建物へ散っていく。同じ建物の二階は潜り教室になっていて、子どもから観光客まで、誰でも短い講習を受けられる。窓辺には、潜守が手入れの合間に拾い集めた貝殻と、各建物の継ぎ目の点検表が並んでいる。"
   ]
  }
 ],
 "characters": [
  {
   "id": "himari",
   "name": "千草 ひまり",
   "short": "ひまり",
   "reading": "ちぐさ ひまり",
   "title": "みぎわ市の案内人",
   "color": "#f2d04d",
   "icon": "assets/img/heroine/himari-normal.webp",
   "expressions": {
    "normal": "assets/img/heroine/himari-normal.webp",
    "smile": "assets/img/heroine/himari-smile.webp",
    "tease": "assets/img/heroine/himari-tease.webp",
    "quiet": "assets/img/heroine/himari-quiet.webp"
   },
   "intro": "水上マーケットの案内所で、初めて来た人を迎える案内人。おすすめを選ぶのが得意で、おいしそうに食べる人を見るのが好き。"
  },
  {
   "id": "shiori",
   "name": "紙谷 しおり",
   "short": "しおり",
   "reading": "かみや しおり",
   "title": "気送管の配達人",
   "color": "#7fb8f0",
   "icon": "assets/img/heroine/shiori-icon.webp",
   "portrait": "assets/img/heroine/shiori-full.webp",
   "expressions": {
    "normal": "assets/img/heroine/shiori-icon.webp"
   },
   "intro": "底郵便局から屋上の庭まで、毎日この街を縦に行き来している配達人。道草が好きで、近道と裏道と、住人の好物をだいたい知っている。"
  },
  {
   "id": "suzu",
   "name": "若葉 すず",
   "short": "すず",
   "reading": "わかば すず",
   "title": "屋上庭の庭師",
   "color": "#7fe0a8",
   "icon": "assets/img/heroine/suzu-normal.webp",
   "expressions": {
    "normal": "assets/img/heroine/suzu-normal.webp",
    "smile": "assets/img/heroine/suzu-smile.webp"
   },
   "intro": "段々屋上の雨受け庭を預かる庭師。雨の味と洗濯物の揺れ方で、その日の天気を読む。口数は多くないが、同じ場所に長くいる人の目で、街をよく見ている。"
  },
  {
   "id": "tsuyu",
   "name": "凪野 つゆ",
   "short": "つゆ",
   "reading": "なぎの つゆ",
   "title": "夜番の潜守",
   "color": "#9b94f0",
   "icon": "assets/img/heroine/tsuyu-normal.webp",
   "expressions": {
    "normal": "assets/img/heroine/tsuyu-normal.webp",
    "smile": "assets/img/heroine/tsuyu-smile.webp",
    "quiet": "assets/img/heroine/tsuyu-quiet.webp"
   },
   "intro": "夜の底宿で、封水された建物の継ぎ目を点検して歩く潜守。口数は少ないが、建物の小さな音や、灯魚の数をよく覚えている。"
  }
 ],
 "courses": [
  {
   "id": "shiori-delivery-1",
   "order": 1,
   "character": "shiori",
   "title": "しおりの配達日和",
   "subtitle": "底から空まで、配達について歩く一日",
   "duration": "約10分",
   "summary": "水底の郵便局から、上層の最初の杭まで。宛名のない手紙を連れて、配達人と一日を歩く。",
   "steps": [
    {
     "place": "lo-post",
     "time": "朝",
     "echoes": [
      {
       "after": "tsuyu-night-1",
       "label": "夜番の話",
       "lines": [
        {
         "expr": "normal",
         "text": "「この局の朝は、夜番の潜守が帰ってくる時間でもあるの。凪野つゆ……今日は、もう上がったみたい」"
        },
        {
         "expr": "smile",
         "text": "「机の上の点検帳に、几帳面な字で『異常なし』って書いてある。つゆの字。見ると、ちょっと安心する」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "底郵便局の窓口の奥で、気送管の筒が、ことん、ことんと落ちてくる。上の街から届く朝いちばんの便だ。"
      },
      {
       "expr": "smile",
       "text": "「あ、来た来た。同行の人だよね？　紙谷しおり、配達人の三年目。今日はよろしく」"
      },
      {
       "expr": "normal",
       "text": "「ルールはひとつだけ。配達の邪魔はしないこと。それ以外は、道草、大歓迎」"
      },
      {
       "who": "narration",
       "text": "手紙を鞄にそろえる彼女の肩の上で、小さな配達機が丸いレンズをちかっと光らせた。"
      },
      {
       "expr": "normal",
       "text": "「この子はマル。運び虫っていう、軽い荷物専用の配達機。気送管が届かない屋上は、マルの担当なんだ」"
      },
      {
       "expr": "quiet",
       "text": "「それと、これ」"
      },
      {
       "who": "narration",
       "text": "棚の奥から、宛名のない古い封筒がそっと取り出される。紙は少し黄ばんで、角が丸くなっていた。"
      },
      {
       "expr": "quiet",
       "text": "「宛先不明の棚の、いちばん古い一通。捨てるわけにもいかないから、毎年、誰かが一日だけ連れ歩くの。今年は、私の番」"
      },
      {
       "expr": "smile",
       "text": "「というわけで、今日の配達は七通と、小包がひとつ。と、これ。まずは上へ向かうよ」"
      }
     ]
    },
    {
     "place": "lo-concourse",
     "time": "朝",
     "echoes": [
      {
       "after": "tsuyu-night-1",
       "label": "夜番の話",
       "lines": [
        {
         "expr": "quiet",
         "text": "「ここ、夜はつゆの担当。夜の発車標は、動かない日が多いんだって」"
        },
        {
         "expr": "normal",
         "text": "「見たことないな、夜の大広間。いつか、昼の私と夜のあの子で、同じ場所の話をしてみたい」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "降り筒の乗り場へ向かう途中、旧駅舎の大広間を抜ける。窓の外を、魚の群れが列車のように横切っていく。"
      },
      {
       "expr": "normal",
       "text": "「ここ、朝がいちばん好き。まだ人が少なくて、足音が天井まで届くんだ」"
      },
      {
       "expr": "surprise",
       "text": "「あ、見て、あの発車標。ときどき勝手に行き先が変わるの。今日は……読めない駅名だね。いつものこと」"
      },
      {
       "expr": "tease",
       "text": "「ちょっとだけ寄っていい？　透き廊の窓、今朝は潜守さんが磨いてるはずなんだ。挨拶だけ」"
      }
     ],
     "detour": {
      "place": "lo-sukiro",
      "label": "透き廊へ寄り道する",
      "lines": [
       {
        "who": "narration",
        "text": "ガラスの廊下の向こうで、潜守が長い柄のブラシを握り、天井の窓をゆっくり磨いている。"
       },
       {
        "expr": "smile",
        "text": "「おはようございまーす！　今朝は厚めに付いてますね」"
       },
       {
        "who": "narration",
        "text": "潜守が手を振り返す。磨かれたガラスの外を、泡の粒が光の筋になって昇っていく。"
       },
       {
        "expr": "quiet",
        "text": "「磨いた直後のガラスって、水の色が一段だけ濃く見えるの。気づいたの、去年なんだけどね」"
       }
      ]
     }
    },
    {
     "place": "bd-orizutsu",
     "time": "朝",
     "lines": [
      {
       "who": "narration",
       "text": "ガラスの籠が上へ動きだす。外の色が、深い青から緑へ、そして白い光へとほどけていく。"
      },
      {
       "expr": "normal",
       "text": "「降り筒って、上りのほうが好き。水から出る瞬間に、耳がふっと軽くなるでしょ？」"
      },
      {
       "expr": "quiet",
       "text": "「ほんの数秒だけ、上も下もない場所にいる感じがするんだ。……あ、水面だ」"
      },
      {
       "who": "narration",
       "text": "籠の扉が開くと、潮の匂いと、遠くの呼び込みの声が一度に流れ込んできた。"
      }
     ]
    },
    {
     "place": "bd-crane",
     "time": "朝",
     "echoes": [
      {
       "after": "himari-market-1",
       "label": "案内所の話",
       "lines": [
        {
         "expr": "smile",
         "text": "「そうだ、案内所のひまりが、初めてのお客さんには、まずここを見せるんだって。赤鶴を見上げる顔が、いちばん素直らしい」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "舟溜まりの真ん中で、赤い長い首のクレーンが、木箱をゆっくり持ち上げている。"
      },
      {
       "expr": "smile",
       "text": "「赤鶴！　朝の荷揚げ、見ていく？　笛の合図と腕の動きだけで、重い箱がぴたっと台車に収まるの」"
      },
      {
       "who": "narration",
       "text": "笛が短く二度鳴ると、箱は寸分の狂いもなく、台車の上に降りた。"
      },
      {
       "expr": "normal",
       "text": "「ね？　あの中に、私が受け取る小包がひとつ入ってるはず。水上町から来た乾物だよ」"
      },
      {
       "expr": "tease",
       "text": "「それとね、赤鶴は年に一度だけ、首を北に向けてる朝があるんだって。見た人は、その年は豊漁。……私は、まだ見てない」"
      }
     ],
     "detour": {
      "place": "bd-waterbus",
      "label": "水上バスのりばへ寄り道する",
      "lines": [
       {
        "who": "narration",
        "text": "屋根のついた待合所の壁に、潮の時刻に合わせてずれていく時刻表が貼ってある。"
       },
       {
        "expr": "normal",
        "text": "「見て、いちばん下の行。行き先が書いてない便が一本だけあるでしょ」"
       },
       {
        "expr": "tease",
        "text": "「乗った人に聞くとね、なぜか誰に聞いても楽しそうに話すの。……私は仕事があるから、まだ乗ったことないけど」"
       }
      ]
     }
    },
    {
     "place": "bd-horo-row",
     "time": "昼",
     "echoes": [
      {
       "after": "himari-market-1",
       "label": "案内所の話",
       "lines": [
        {
         "expr": "tease",
         "text": "「ひまりは、この通りの串焼きを『初心者の一本目』って勧めてる。私は、貝の汁派なんだけど」"
        },
        {
         "expr": "normal",
         "text": "「どっちも間違いじゃない。好みは、人の数だけある」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "昼どきの幌の下は、串焼きの煙と貝の汁の湯気でいっぱいだ。橙と赤の布が、潮風にゆるく揺れている。"
      },
      {
       "expr": "smile",
       "text": "「はい、乾物の箱、お届けでーす！　……おじさん、今日もいい匂い」"
      },
      {
       "who": "narration",
       "text": "屋台の主人は箱を受け取ると、お礼に熱い貝の汁をふたつ、湯気ごと差し出した。"
      },
      {
       "expr": "smile",
       "text": "「配達のお駄賃は、だいたい食べ物。これがいちばん嬉しいんだ」"
      },
      {
       "expr": "normal",
       "text": "「ふーふーして飲むと、潮の味のあとに、ほんのり甘みが来るの。濾し貝の出汁って、そういうものらしいよ」"
      },
      {
       "expr": "quiet",
       "text": "「そういえば、さっきの宛名のない手紙。封筒の端に、小さな印があるんだ。魚の形。底郵便局の消印に似てるけど、少しだけ違う」"
      },
      {
       "expr": "tease",
       "text": "「……向かいの沈み物市、のぞいていかない？　手がかり、あるかもしれない」"
      }
     ],
     "detour": {
      "place": "bd-shizumimono",
      "label": "沈み物市へ寄り道する",
      "lines": [
       {
        "who": "narration",
        "text": "台の上に、洗われた古い切符、止まった腕時計、看板から外れた一文字が並んでいる。小さな札がひとつずつ付いていた。"
       },
       {
        "expr": "surprise",
        "text": "「あ、魚のスタンプ！……ううん、これは別物かあ。形は近いんだけどな」"
       },
       {
        "expr": "smile",
        "text": "「でも、いい。探してるときのほうが、いろんなものが見える気がするから」"
       }
      ]
     }
    },
    {
     "place": "up-kuimi",
     "time": "午後",
     "lines": [
      {
       "who": "narration",
       "text": "幌通りの端から、杭見坂の木の階段が空へ向かって伸びている。手すりのすぐ脇を、杭の林が流れていく。"
      },
      {
       "expr": "normal",
       "text": "「この坂ね、杭に巻いてある帯が、下へ行くほど古い色なの。上りだと、時間がだんだん若返っていく感じがしない？」"
      },
      {
       "expr": "smile",
       "text": "「マル、先に屋上の三通、お願い！」"
      },
      {
       "who": "narration",
       "text": "小さな配達機が羽音を立てて、手紙を抱えたまま空へ上がっていった。陽ざしの中で、レンズがひとつ光った。"
      },
      {
       "expr": "normal",
       "text": "「私たちは階段で行こう。……息、上がってない？　水面が遠くなると、風の匂いがちょっと変わるでしょ」"
      }
     ]
    },
    {
     "place": "up-hatsukui",
     "time": "夕方",
     "echoes": [
      {
       "after": "suzu-garden-1",
       "label": "庭師の話",
       "lines": [
        {
         "expr": "normal",
         "text": "「この杭のそばで、夕方によく空を見上げてる子がいるの。屋上庭の庭師の、若葉すず。雨の味で、天気を当てるんだって」"
        },
        {
         "expr": "tease",
         "text": "「私が手紙を置く時間は、いつも見られてるかも。……見られても、困らないけど」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "大桟橋テラスのまんなかに、床から腰の高さだけ頭を出した、黒くつやつやの杭がある。夕方の光が、床板の年輪を金色に染めていた。"
      },
      {
       "expr": "quiet",
       "text": "「着いた。ここが、今日の最後の寄り道」"
      },
      {
       "expr": "normal",
       "text": "「初杭。引っ越してきた日と、旅立つ日に、ここに手を置くのが決まりなんだ。私も、三年前に置いたよ」"
      },
      {
       "who": "narration",
       "text": "しおりは鞄から、あの宛名のない封筒を取り出して、杭の上にそっと置いた。"
      },
      {
       "expr": "quiet",
       "text": "「連れ歩くのは、一日だけ。夜になるまで、ここに置いておくの」"
      },
      {
       "expr": "quiet",
       "text": "「朝になるとね、いつもなくなってる。誰が持っていくのかは、知らない。知らなくていいかなって、最近は思ってる」"
      },
      {
       "expr": "surprise",
       "text": "「あ、耳、当ててみて。……聞こえた？　電車が走りだす音」"
      },
      {
       "expr": "smile",
       "text": "「子どものころは、本気で信じてたんだ。いまは、半分だけ」"
      }
     ]
    },
    {
     "place": "up-lanterns",
     "time": "夜",
     "echoes": [
      {
       "after": "suzu-garden-1",
       "label": "庭師の話",
       "lines": [
        {
         "expr": "smile",
         "text": "「この通りの天気予報、すずはあんまり信じてないんだって。自分の舌のほうが当たるって、勝負してるらしいよ」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "日が落ちると、塔の壁の灯幕が、ゆっくり色を変えはじめる。光は桟橋のすき間から水面へ落ちて、境界の市場の天井をほんのり染めた。"
      },
      {
       "expr": "smile",
       "text": "「配達、おしまい！　今日は一緒に歩いてくれて、ありがとう」"
      },
      {
       "expr": "normal",
       "text": "「ほら、幕に出てるの、今日の潮位と、誰かの誕生日のお祝い。ああいうのを読みながら帰るのが、私の仕事終わりの楽しみ」"
      },
      {
       "expr": "tease",
       "text": "「またおいで。次は、違う道を案内するから。道草のほうが長くなっても、怒らないでね」"
      },
      {
       "who": "narration",
       "text": "彼女は鞄を肩にかけ直して、手を振った。足元で、配達機がふわりと光った。"
      }
     ]
    }
   ]
  },
  {
   "id": "tsuyu-night-1",
   "order": 2,
   "character": "tsuyu",
   "title": "つゆの夜番",
   "subtitle": "灯魚が灯るまでの、静かな見回り",
   "duration": "約10分",
   "summary": "日没の水上の市から、水底の無音の間まで。夜番の潜守と、点検の見回りを歩く。",
   "steps": [
    {
     "place": "bd-lantern",
     "time": "日没",
     "echoes": [
      {
       "after": "himari-market-1",
       "label": "案内所の話",
       "lines": [
        {
         "expr": "normal",
         "text": "「……昼に、案内所の子が、ここの灯籠舟の話をしていた。『夜は、つゆちゃんに聞いて』って」"
        },
        {
         "expr": "quiet",
         "text": "「人に勧めるの、上手な子。……わたしは、そういうの、苦手」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "日没の鐘が、水の上を渡っていく。輪の間の南の水面に、灯籠を吊るした小舟が、ひとつ、またひとつと集まってくる。"
      },
      {
       "expr": "normal",
       "text": "「……あなたが、同行者？　話は聞いてる。凪野つゆ。夜番の潜守」"
      },
      {
       "expr": "normal",
       "text": "「夜の見回りについてくるだけ。それなら、別にいい。静かにしてくれるなら」"
      },
      {
       "who": "narration",
       "text": "つゆは舟には乗らず、桟橋の端に立ったまま、灯籠の数を目で数えている。灯りが水面に映って、細く長くのびていた。"
      },
      {
       "expr": "normal",
       "text": "「満月の晩だけ、一艘多いって言われてる。今日は満月じゃない。……数は、合ってる」"
      },
      {
       "expr": "quiet",
       "text": "「夜は、始まる前がいちばん静か。灯りが全部そろうまでの、少しのあいだ」"
      },
      {
       "expr": "smile",
       "text": "「あなた、歩くの、ゆっくり？　……なら、ちょうどいい。夜は急がないから」"
      },
      {
       "expr": "normal",
       "text": "「降りるよ。灯りは、下にもあるから」"
      }
     ]
    },
    {
     "place": "bd-orizutsu",
     "time": "夜",
     "lines": [
      {
       "who": "narration",
       "text": "ガラスの籠が降りていく。夜の水は昼より濃い青で、遠くの灯籠の光だけが、揺れながら上へ遠ざかっていった。"
      },
      {
       "expr": "normal",
       "text": "「夜の降り筒は、乗る人がほとんどいない。ほとんど、貸し切り」"
      },
      {
       "expr": "quiet",
       "text": "「降りるとき、いつも思う。光が小さくなるほど、音も小さくなるって。……あなたは、どう？」"
      },
      {
       "who": "narration",
       "text": "籠の外を、はぐれた灯魚が一匹、ゆっくりとついてくる。小さな体が、うっすら青白く光っていた。"
      },
      {
       "expr": "normal",
       "text": "「あれは、迷子。大丈夫、だいたい戻る」"
      }
     ]
    },
    {
     "place": "lo-concourse",
     "time": "夜",
     "echoes": [
      {
       "after": "shiori-delivery-1",
       "label": "朝の話",
       "lines": [
        {
         "expr": "normal",
         "text": "「朝の配達人が、この広間が好きって言ってたらしい。朝がいちばん好き、って」"
        },
        {
         "expr": "smile",
         "text": "「……わかる。わたしは夜のほうが好きだけど、朝の足音の響き方は、きっと、いい」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "夜の大広間は、昼とは別の場所のようだった。青い常夜灯が床に落ち、窓の外では魚たちが、眠る前の、ゆっくりした列で泳いでいる。"
      },
      {
       "expr": "normal",
       "text": "「ここの夜は、人が少ない。足音がしないから、魚の音が聞こえる気がする。……聞こえないけど」"
      },
      {
       "expr": "normal",
       "text": "「発車標、見て。今夜は、動かない日みたい。……動くところ、見たかった？」"
      },
      {
       "expr": "quiet",
       "text": "「見られなかったなら、それでいい。見られなかった夜も、悪くない」"
      },
      {
       "expr": "normal",
       "text": "「光井戸、寄る？　夜は、光の柱がない。なにもないけど。……わたしは、そこが好き」"
      }
     ],
     "detour": {
      "place": "lo-light-well",
      "label": "光井戸へ寄り道する",
      "lines": [
       {
        "who": "narration",
        "text": "ビルの谷間の底に立って見上げると、四角く切り取られた夜空に、星がいくつか浮かんでいる。昼の光の柱は、そこにはなかった。"
       },
       {
        "expr": "quiet",
        "text": "「昼は、人が集まる場所。夜は、わたしひとりのことが多い」"
       },
       {
        "expr": "quiet",
        "text": "「でも、昼に落ちた光が、まだ水の中に残ってる気がする。……気のせい」"
       },
       {
        "expr": "smile",
        "text": "「付き合ってくれて、ありがとう。……別に、礼を言うほどのことじゃないけど」"
       }
      ]
     }
    },
    {
     "place": "lo-sukiro",
     "time": "夜",
     "lines": [
      {
       "who": "narration",
       "text": "ガラスの廊下は、夜になると鏡のようになる。歩く二人と、並んで泳ぐ魚の影が、ガラスの上に重なって映る。"
      },
      {
       "expr": "normal",
       "text": "「点検の順番は、決まってる。この廊下は、継ぎ目を右手でなぞって歩く」"
      },
      {
       "who": "narration",
       "text": "つゆは壁に指を滑らせ、ある継ぎ目のところで、ほんの一瞬だけ手を止めた。"
      },
      {
       "expr": "normal",
       "text": "「ここ。少し、冷たい。……大丈夫、異常じゃない。夜は水温が下がるだけ」"
      },
      {
       "expr": "quiet",
       "text": "「点検って、直すより、聞くことのほうが多い。建物の、小さな音を」"
      },
      {
       "expr": "normal",
       "text": "「昔の構内放送が聞こえるって噂、知ってる？　わたしも聞いたことがある。……五回に一回くらい」"
      }
     ]
    },
    {
     "place": "lo-train-gallery",
     "time": "夜",
     "lines": [
      {
       "who": "narration",
       "text": "封水された旧ホームが、細長い展示室になっている。窓の外の線路には、昔の車両が、止まったときのまま並んでいた。夜には、それぞれの車内で、灯魚の淡い光が点々と灯る。"
      },
      {
       "expr": "normal",
       "text": "「窓の外、いちばん端の車両。灯りがついてるでしょ」"
      },
      {
       "expr": "normal",
       "text": "「あの車両だけは、灯りが消えたことがない。電気は、どこからも来てないのに。点検の記録には、『異常なし』って書いてある」"
      },
      {
       "expr": "quiet",
       "text": "「異常じゃないの。ずっと、ああいうもの。誰も困ってない」"
      },
      {
       "expr": "smile",
       "text": "「わたしは、あの灯りを見てから、夜の見回りを始める。……挨拶みたいなもの」"
      },
      {
       "expr": "normal",
       "text": "「窓のいちばん奥、見える？　青く沈んだホームの端。濾し貝の苗床で、立ち入りは潜守だけ」"
      },
      {
       "expr": "quiet",
       "text": "「そこで発車ベルが鳴るのを聞いた潜守は、その年いちばんの貝を育てるって。……わたしは、まだ聞いたことない」"
      },
      {
       "expr": "normal",
       "text": "「苔の地下街、行ってみる？　案内つきでしか入れないから。わたしが案内する」"
      }
     ],
     "detour": {
      "place": "lo-moss-arcade",
      "label": "苔の地下街へ、つゆの案内で",
      "lines": [
       {
        "who": "narration",
        "text": "通路の灯りが落とされると、苔がほのかに緑に光りはじめた。壁にも天井にも柔らかな苔が広がり、その下から、昔の店の名前が少しだけ透けている。"
       },
       {
        "expr": "normal",
        "text": "「ここは、案内つきでしか入れない。迷うから。……わたしは、毎回、少し違う道を通る」"
       },
       {
        "expr": "quiet",
        "text": "「でも、必ず同じ出口に着く。理由は、知らない。知らなくていいと思ってる」"
       },
       {
        "expr": "smile",
        "text": "「苔の光は、まっすぐ見るより、横目で見たほうがきれい。やってみて」"
       },
       {
        "who": "narration",
        "text": "言われたとおり視線を少しずらすと、通路の奥で、緑の光がふわりと濃くなった。"
       }
      ]
     }
    },
    {
     "place": "lo-hikari-tower",
     "time": "夜",
     "echoes": [
      {
       "after": "suzu-garden-1",
       "label": "庭師の話",
       "lines": [
        {
         "expr": "normal",
         "text": "「上の街の灯幕が明るい夜ほど、ここの光も強くなる……って話、屋上庭の庭師から聞いた。すず、だったかな」"
        },
        {
         "expr": "quiet",
         "text": "「本当かどうか、聞いたことはない。聞かないほうが、いい気がして」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "沈んだ塔の窓が、ひとつ、またひとつと灯っていく。淡い青白い光は、灯魚の群れがいっせいにまとったものだ。"
      },
      {
       "expr": "normal",
       "text": "「始まった。毎晩、日没のおよそ二時間あと」"
      },
      {
       "expr": "normal",
       "text": "「わたしは、ここで灯魚の数を数える。数えなくてもいいんだけど、数えると、安心する」"
      },
      {
       "who": "narration",
       "text": "窓の奥で、光る群れが渦を巻きながら昇っていく。赤い看板の下の窓まで、光は途切れずに続いた。"
      },
      {
       "expr": "quiet",
       "text": "「上の街の灯幕が明るい夜ほど、ここの光も強くなる。上と下で、光の挨拶をしてるんだって」"
      },
      {
       "expr": "smile",
       "text": "「……いい話だと思う。本当かどうかは、どうでもいい」"
      },
      {
       "expr": "normal",
       "text": "「今夜の数は、いつもと同じ。それが、いちばん嬉しい」"
      }
     ]
    },
    {
     "place": "lo-quiet-hall",
     "time": "夜",
     "lines": [
      {
       "who": "narration",
       "text": "無音の間の扉の前で、つゆは足を止めた。"
      },
      {
       "expr": "normal",
       "text": "「ここは、話さない決まり。入ったら、おしまい」"
      },
      {
       "expr": "quiet",
       "text": "「見回りの最後は、いつもここ。窓辺に座って、少しだけ、何もしない」"
      },
      {
       "expr": "smile",
       "text": "「今日は、ありがとう。……ここからは、言葉はいらないから」"
      },
      {
       "who": "narration",
       "text": "扉が静かに開く。外の音が、ふっと遠くなった。"
      },
      {
       "who": "narration",
       "text": "青い光の中を、魚がゆっくり横切っていく。窓辺に並んで座った二人のあいだに、言葉はなかった。"
      },
      {
       "who": "narration",
       "text": "やがて、つゆが、ほんの少しだけ、こちらへ肩を寄せた。"
      }
     ]
    }
   ]
  },
  {
   "id": "himari-market-1",
   "order": 3,
   "character": "himari",
   "title": "ひまりの市場案内",
   "subtitle": "はじめてのみぎわ市、昼から夕方まで",
   "duration": "約10分",
   "summary": "水上バスのりばから泳ぎ段まで。みぎわ市の案内人と、初めての水上マーケットを東から西へ歩く。",
   "steps": [
    {
     "place": "bd-waterbus",
     "time": "昼前",
     "lines": [
      {
       "who": "narration",
       "text": "水上バスが桟橋に着くと、屋根のついた待合所の前で、黄色いリボンの案内人が大きく手を振っていた。"
      },
      {
       "expr": "smile",
       "text": "「ようこそ、みぎわ市へ！　案内所の千草ひまりです。今日は、お客さん専属のガイドだよ！」"
      },
      {
       "expr": "normal",
       "text": "「まず、約束ひとつ。歩く順番は、東から西。潮の流れと同じ向きだから、疲れにくいの」"
      },
      {
       "expr": "tease",
       "text": "「それと、おなかは空けておいてね。今日は、食べ歩きが半分くらいを占めます」"
      },
      {
       "expr": "normal",
       "text": "「あ、時刻表のいちばん下の行は、見ないで。あれは、見はじめると帰れなくなるから」"
      },
      {
       "expr": "smile",
       "text": "「それじゃ、出発！　最初は、赤鶴から！」"
      }
     ]
    },
    {
     "place": "bd-crane",
     "time": "午前",
     "echoes": [
      {
       "after": "shiori-delivery-1",
       "label": "朝の話",
       "lines": [
        {
         "expr": "normal",
         "text": "「そういえば、配達人のしおりちゃんが、今朝ここで荷物を受け取ってたよ。あの子、赤鶴の首の向きを、毎年気にしてるの」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "舟溜まりの真ん中で、赤い長い首のクレーンが、木箱をゆっくり持ち上げている。"
      },
      {
       "expr": "smile",
       "text": "「ここが赤鶴！　初めてのお客さんは、まずここで首を上げて、びっくりする係なの」"
      },
      {
       "expr": "normal",
       "text": "「見て、あの首の角度。重い箱を持ち上げてるのに、笛の合図ひとつで、ぴたっと止まるんだよ」"
      },
      {
       "expr": "tease",
       "text": "「待ち合わせの目印にもなるの。『赤鶴の足元で』って言えば、どの舟の人にも通じる」"
      },
      {
       "expr": "normal",
       "text": "「降り筒の第一口も、すぐそこ。下の街へは、また後でね。……ちょっとだけ、見ていく？」"
      }
     ],
     "detour": {
      "place": "bd-orizutsu",
      "label": "降り筒・第一口をのぞく",
      "lines": [
       {
        "who": "narration",
        "text": "塔の看板の下で、ガラスの籠が、水面の下へ静かに降りていく。"
       },
       {
        "expr": "normal",
        "text": "「ここから、下層の旧駅舎まで一直線。料金はなし。朝夕は通勤の列で、昼は観光の列」"
       },
       {
        "expr": "smile",
        "text": "「下に行くのは、今日は我慢！　でも、降りていく籠を見送るのも、けっこう贅沢でしょ？」"
       }
      ]
     }
    },
    {
     "place": "bd-ring-stage",
     "time": "昼",
     "lines": [
      {
       "who": "narration",
       "text": "円形の浮き台が、潮にあわせて、ゆっくり上下している。昼の輪舞台は、荷さばきの人たちが木箱を積み替える、働く場所だ。"
      },
      {
       "expr": "normal",
       "text": "「ここは、輪舞台。昼は荷さばき場だけど、夕方になると、誰かが楽器を持って集まってくるの」"
      },
      {
       "expr": "smile",
       "text": "「潮が動くと、舞台ごと揺れるでしょ？　それに合わせて踊る『潮踊り』は、境界でしか見られないんだ」"
      },
      {
       "expr": "tease",
       "text": "「夕方に戻ってきたら、特等席を教えてあげる。……夕市の準備、のぞいてく？」"
      }
     ],
     "detour": {
      "place": "bd-lantern",
      "label": "灯籠舟の準備をのぞく",
      "lines": [
       {
        "who": "narration",
        "text": "輪の間の南の水面で、小舟の主たちが、灯籠に小さな火袋を取りつけている。"
       },
       {
        "expr": "normal",
        "text": "「日没の鐘が鳴ると、ここに灯籠舟が集まって、水の上の夜市が始まるの」"
       },
       {
        "expr": "smile",
        "text": "「甘いものと、小さな灯りと、灯魚を模した飴細工。お土産の定番だよ」"
       }
      ]
     }
    },
    {
     "place": "bd-nozoki",
     "time": "昼下がり",
     "echoes": [
      {
       "after": "tsuyu-night-1",
       "label": "夜の話",
       "lines": [
        {
         "expr": "quiet",
         "text": "「この床の下の大広間、夜は、夜番のつゆちゃんが見回ってるんだって。夜に覗くと、青い灯りがついてるって聞いたよ」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "青い屋根の茶屋の座敷で、床の半分がガラスになっている。真下の水中に、沈んだ旧駅舎の屋根が、苔をまとって横たわっていた。"
      },
      {
       "expr": "smile",
       "text": "「ここが、覗き床茶屋！　おすすめは、濾し貝の出汁で炊いたお粥。急いでいる人には、出せないメニューです」"
      },
      {
       "expr": "normal",
       "text": "「ガラスの床の下を見て。あれが、下の街の屋根。昼どきは、光がまっすぐ水に差し込んで、魚の影が、屋根の上を通っていくの」"
      },
      {
       "expr": "quiet",
       "text": "「……こうして座ると、時間が、ゆっくりになるでしょ。案内人は、ここで一回、息をつくの」"
      },
      {
       "expr": "tease",
       "text": "「それとね、ガラスの下をじっと見てると、下の人と目が合うことがあるの。たいてい、手を振ってくれるから、振り返してあげて」"
      }
     ],
     "detour": {
      "place": "lo-concourse",
      "label": "床の真下の大広間をのぞく",
      "lines": [
       {
        "who": "narration",
        "text": "ガラスの下、旧駅舎の高い天井の下で、誰かがこちらを見上げて、小さく手を振っている。"
       },
       {
        "expr": "smile",
        "text": "「ほら、振り返して！　お客さんが手を振ると、下の人も、ちょっと嬉しそうなの」"
       },
       {
        "expr": "normal",
        "text": "「あそこが旧駅舎の大広間。入場無料で、一日じゅういられるよ。降り筒で、いつか行ってみてね」"
       }
      ]
     }
    },
    {
     "place": "bd-shizumimono",
     "time": "午後",
     "lines": [
      {
       "who": "narration",
       "text": "台の上に、洗われた古い切符や、止まった腕時計、看板から外れた一文字が、小さな札をつけて並んでいる。"
      },
      {
       "expr": "normal",
       "text": "「沈み物市。潜守さんたちが、手入れの途中で見つけた古い品を売ってるの」"
      },
      {
       "expr": "smile",
       "text": "「お土産探しなら、ここ。切符一枚から買えるよ。『どの建物の何階で出てきたか』も、売り手さんが教えてくれる」"
      },
      {
       "expr": "tease",
       "text": "「私のおすすめは、看板の文字！　一文字ずつ集めると、昔の店の名前が、ひとつ完成するの。……私は、まだ三文字」"
      },
      {
       "expr": "normal",
       "text": "「お客さんも、ひとつ選んでみて。決められなかったら、最初に気になったものが、お客さんの一枚」"
      }
     ]
    },
    {
     "place": "bd-horo-row",
     "time": "夕方",
     "echoes": [
      {
       "after": "shiori-delivery-1",
       "label": "朝の話",
       "lines": [
        {
         "expr": "smile",
         "text": "「しおりちゃんのお駄賃は、貝の汁なんだって。案内所でも、いちばん人気。やっぱり、そうなるよね」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "夕方の幌の下は、串焼きの煙と、汁物の湯気でいっぱいだ。橙と赤の布の下で、人の声が重なっている。"
      },
      {
       "expr": "smile",
       "text": "「幌通り！　食べ歩きの本番は、ここから！　最初の一本は、迷わず串焼き。これが、初心者の一本目」"
      },
      {
       "expr": "tease",
       "text": "「次は、貝の汁を一杯。それから、甘いもので締める。この順番を守ると、おなかが最後まで元気」"
      },
      {
       "expr": "normal",
       "text": "「この通りは、板のすき間から水面がちらちら見えるの。落とした串は、魚が持っていくから、気にしないで」"
      },
      {
       "expr": "smile",
       "text": "「……ね、おいしい？　その顔が見たくて、案内人をやってるんだよ」"
      }
     ]
    },
    {
     "place": "bd-oyogiba",
     "time": "日没前",
     "echoes": [
      {
       "after": "tsuyu-night-1",
       "label": "夜の話",
       "lines": [
        {
         "expr": "normal",
         "text": "「日が沈むと、夜の見回りの人たちの時間。灯籠舟の桟橋の端で、灯りの数を数えてる子がいたら、それが夜番のつゆちゃん」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "桟橋の南の端から、昔の外階段が、そのまま水の中へ続いている。夕日が、水面をオレンジに染めていた。"
      },
      {
       "expr": "normal",
       "text": "「ここが、泳ぎ段。今日の、最後の場所」"
      },
      {
       "expr": "smile",
       "text": "「朝は子どもたちの泳ぎ場で、昼は潜りの練習場。夕方は、足だけつけて、一日を終える場所」"
      },
      {
       "expr": "quiet",
       "text": "「段に腰かけて、足を水につけると、ずっと下の街の屋根が見えるの。……今日、歩いたところも、ぜんぶ」"
      },
      {
       "expr": "normal",
       "text": "「日が沈んだら、遊泳は禁止。夜の荷舟から、泳いでる人が見えなくなっちゃうから」"
      },
      {
       "expr": "tease",
       "text": "「でも、日没は、もうすぐ。そしたら、灯籠舟の夕市が始まるよ。夜のみぎわ市も、また見に来てね」"
      },
      {
       "expr": "smile",
       "text": "「今日は、一日、ありがとう！　お客さんの『楽しい』を、ひとつ見つけられたなら、案内人の勝ちです」"
      }
     ]
    }
   ]
  },
  {
   "id": "suzu-garden-1",
   "order": 4,
   "character": "suzu",
   "title": "すずの雨上がり",
   "subtitle": "屋上の庭から、水平線まで",
   "duration": "約10分",
   "summary": "雨が上がった朝の屋上庭から、夕方の水平線デッキまで。庭師と、上の街で天気の答え合わせをする一日。",
   "steps": [
    {
     "place": "up-rain-garden",
     "time": "雨上がりの朝",
     "lines": [
      {
       "who": "narration",
       "text": "雨が上がったばかりの屋上の庭。葉の上の滴と、送気塔の白い湯気が、いっしょに光っている。"
      },
      {
       "expr": "normal",
       "text": "「……おはよう。早いね、お隣さん」"
      },
      {
       "expr": "normal",
       "text": "「若葉すず。ここの庭師。雨受けの桶を預かってる」"
      },
      {
       "who": "narration",
       "text": "庭のあちこちに大きな雨受けの桶が置かれ、細い樋が、畑へ水を引いている。"
      },
      {
       "expr": "normal",
       "text": "「今朝は、桶が七分目。野菜には、ちょうどいい量」"
      },
      {
       "expr": "smile",
       "text": "「雨の味で、その日の天気がわかるの。……先生のおばあさんに、覚えさせられた」"
      },
      {
       "expr": "normal",
       "text": "「ひと口、飲んでみる？　……冗談。雨水は、そのまま飲むものじゃない」"
      },
      {
       "expr": "smile",
       "text": "「でも、匂いは嗅いでいいよ。雨上がりの屋上は、新宿でいちばん、いい匂いがする」"
      },
      {
       "expr": "normal",
       "text": "「歩こう。今日は、雨のあとの一日を、辿ってみる」"
      }
     ]
    },
    {
     "place": "up-lanterns",
     "time": "昼前",
     "lines": [
      {
       "who": "narration",
       "text": "塔の壁を覆う灯幕が、昼の明るさのなかで、潮位と天気予報を映している。夜のような色はなく、白い光が淡く並んでいた。"
      },
      {
       "expr": "normal",
       "text": "「昼の灯幕は、静か。夜になると色が変わるけど、昼は、潮位と天気だけ」"
      },
      {
       "expr": "normal",
       "text": "「ほら、『午後から晴れ』って出てる。……わたしの舌は、『夕方まで、薄曇り』って言ってるけど」"
      },
      {
       "expr": "smile",
       "text": "「どっちが当たるか、夕方に答え合わせ。これが、毎日の、ひそかな楽しみ」"
      },
      {
       "expr": "normal",
       "text": "「あの隅の、小さい文字。誰かの伝言なんだよ。『明日の朝市、野菜多め』って」"
      },
      {
       "expr": "smile",
       "text": "「わたしの苗の、宣伝。……ちょっと、照れる」"
      }
     ],
     "detour": {
      "place": "up-horizon",
      "label": "水平線デッキの下見をする",
      "lines": [
       {
        "who": "narration",
        "text": "塔の最上部で、アンテナが風にかすかに揺れている。展望床には、まだ誰もいない。"
       },
       {
        "expr": "normal",
        "text": "「ここが、今日の最後の場所。風が強い日は、閉まってるんだけど、今日は、開いてる」"
       },
       {
        "expr": "smile",
        "text": "「夕方に、また来よう。答え合わせは、ここでするって、決めてるの」"
       }
      ]
     }
    },
    {
     "place": "up-dome-plaza",
     "time": "昼",
     "echoes": [
      {
       "after": "himari-market-1",
       "label": "案内所の話",
       "lines": [
        {
         "expr": "normal",
         "text": "「案内所のひまりは、初めてのお客さんを、まずここに連れてくるんだって。噴水の水が下から来てるって話、いつも楽しそうにしてる」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "円いガラス屋根の下の浅い水盤に、空と雲が、そっくり映っている。子どもたちが、裸足で水の中を歩いていた。"
      },
      {
       "expr": "normal",
       "text": "「水鏡ドーム。水盤が空を映すから、雲が、足元を通るの」"
      },
      {
       "expr": "smile",
       "text": "「雨が降ると、ここの水位が上がる。晴れると、少し下がる。……水盤は、空の帳簿みたいなもの」"
      },
      {
       "expr": "normal",
       "text": "「噴水の水は、下の街から来てるんだって。濾し貝に濾されて、すごく澄んでる。雨の水とは、味が違うの」"
      },
      {
       "expr": "normal",
       "text": "「ここで、昼ごはん。ベンチで、屋上の野菜を挟んだパン。……あげないよ」"
      },
      {
       "expr": "smile",
       "text": "「……半分なら、いいよ」"
      }
     ],
     "detour": {
      "place": "up-hatsukui",
      "label": "初杭の「床の年輪」を見る",
      "lines": [
       {
        "who": "narration",
        "text": "大桟橋のまんなかに、腰の高さだけ頭を出した、黒くつやつやの杭がある。床板の色が、杭を中心に、年輪のように変わっていた。"
       },
       {
        "expr": "normal",
        "text": "「初杭。ここから、床が外へ広がっていったの。色の違いが、継ぎ足された年代」"
       },
       {
        "expr": "smile",
        "text": "「庭の土も、同じ。古い畑ほど、色が濃い。……時間が、土に沈んでる」"
       },
       {
        "expr": "normal",
        "text": "「手を、置いてみて。わたしは、毎朝、ここで天気を聞く」"
       }
      ]
     }
    },
    {
     "place": "up-hoshiba",
     "time": "午後",
     "lines": [
      {
       "who": "narration",
       "text": "海からの風がまっすぐ抜ける細い路地に、洗濯物の旗がはためいている。軒先には、猫が一匹ずつ座っていた。"
      },
      {
       "expr": "normal",
       "text": "「干し場横丁。風が通るから、洗濯物がよく乾く。……猫も、風が通る場所を、知ってる」"
      },
      {
       "expr": "smile",
       "text": "「ここの猫は、十三匹。数えるたびに、どこかの一匹が入れ替わってるの」"
      },
      {
       "expr": "normal",
       "text": "「あの駄菓子屋の奥さんは、わたしの苗の、いちばんのお客さん。トマトが好き」"
      },
      {
       "expr": "normal",
       "text": "「洗濯物の揺れる向きで、風の強さがわかる。庭師には、ちょうどいい時計」"
      },
      {
       "expr": "smile",
       "text": "「……猫の機嫌も、読める。いまは、ご機嫌。少し、撫でてあげて」"
      }
     ]
    },
    {
     "place": "up-shiomi",
     "time": "夕方前",
     "lines": [
      {
       "who": "narration",
       "text": "星の紋章を掲げた塔の壁を、光の帯が縦に走っている。潮が満ちるにつれて、帯は、ゆっくり上へ伸びていた。"
      },
      {
       "expr": "normal",
       "text": "「潮見塔。光の帯が、潮の高さ。いまは、七分目」"
      },
      {
       "expr": "normal",
       "text": "「雨が降ると、潮も少し変わる。庭の水が、巡りめぐって、最後は、ここに戻ってくるの」"
      },
      {
       "expr": "smile",
       "text": "「だから、庭師も、潮見をする。……お隣さんも、帯の高さを覚えて帰ってね」"
      },
      {
       "expr": "normal",
       "text": "「看板の読み方、教えようか。『七分』は、いま。『満ち』は、これから」"
      }
     ]
    },
    {
     "place": "up-horizon",
     "time": "夕方",
     "echoes": [
      {
       "after": "tsuyu-night-1",
       "label": "夜番の話",
       "lines": [
        {
         "expr": "normal",
         "text": "「夜番のつゆは、日が沈んだら、下の街。……上の灯幕が明るい夜ほど、下の灯りも強いって話、広めたのは、たぶん、わたし」"
        },
        {
         "expr": "smile",
         "text": "「本当かどうかは、知らない。でも、そうだったら、いいなって」"
        }
       ]
      }
     ],
     "lines": [
      {
       "who": "narration",
       "text": "新都市でいちばん高い展望床。足元には屋根と庭が広がり、その外側は、見渡すかぎりの水だった。"
      },
      {
       "who": "narration",
       "text": "夕日が、水平線の向こうの水上町と、水面から頭だけ出した遠くの塔を、赤く染めていく。"
      },
      {
       "expr": "normal",
       "text": "「答え合わせ、しようか。灯幕は、『午後から晴れ』。わたしの舌は、『夕方まで、薄曇り』」"
      },
      {
       "expr": "normal",
       "text": "「……見て。西の空、少しだけ、雲が残ってる」"
      },
      {
       "expr": "smile",
       "text": "「わたしの、勝ち。……ほんの、少しだけね」"
      },
      {
       "expr": "normal",
       "text": "「ここにいる時間が、いちばん好きかも。一日のぜんぶが、ここから見えるから」"
      },
      {
       "expr": "normal",
       "text": "「雨も、庭も、猫も、潮も。ぜんぶ、つながってる。……お隣さんが歩いてくれたから、今日は、それがよく見えた」"
      },
      {
       "expr": "smile",
       "text": "「また、雨上がりに。そのときは、庭の野菜を、ひとつ持たせてあげる」"
      }
     ]
    }
   ]
  }
 ]
};
