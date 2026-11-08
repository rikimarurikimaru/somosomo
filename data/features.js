/* SOMOSOMO（そもそも） — テーマ特集の目録。
   特集＝関連する記事を「読む順番」に並べて、1つのテーマを深掘りできるようにしたもの。
   articles の順番がそのまま「この特集の読み方」になる。cover は背景写真を借りるカテゴリ。 */
window.ZUKAN_FEATURES = [
  {
    id: "map-and-nations", no: "01", en: "MAPS & NATIONS", cover: "history",
    title: "国の運命は、地図で決まる？",
    lead: "大国にはさまれた小さな国、海の交差点で栄えた島。地図を広げると、国の歴史が違って見えてきます。",
    articles: ["singapore", "silk-road", "time-zones"]
  },
  {
    id: "everyday-systems", no: "02", en: "EVERYDAY SYSTEMS", cover: "society",
    title: "「当たり前」の裏側にある、すごいしくみ",
    lead: "棚に並ぶお弁当、時間どおりの電車、すぐ届くメッセージ。毎日のふつうを支える見えない仕組みを順番にのぞきます。",
    articles: ["konbini-restock", "train-punctuality", "global-shipping", "internet-delivery", "bank-money"]
  },
  {
    id: "unreliable-brain", no: "03", en: "THE UNRELIABLE BRAIN", cover: "mind",
    title: "脳は、思ったよりあてにならない",
    lead: "忘れる、見落とす、時間を忘れる、決められない。うっかりの正体は、脳がもともと持っているクセでした。",
    articles: ["forgetting", "overlooking", "sns-time", "too-many-choices", "easy-to-talk"]
  },
  {
    id: "sky-and-space", no: "04", en: "SKY & SPACE", cover: "nature",
    title: "空と宇宙の、見えない力",
    lead: "飛行機を浮かせる力、雷を落とす力、土星の輪をつくる力。頭の上で起きていることを、図解でつかみます。",
    articles: ["airplane-flight", "lightning", "saturn-rings", "time-zones"]
  },
  {
    id: "ancient-engineering", no: "05", en: "ANCIENT ENGINEERING", cover: "tech",
    title: "何百年も残る建物の、ひみつ",
    lead: "ピラミッド、ローマの水道、日本の木造建築、巨大な橋。時代をこえて残るものには、共通する知恵がありました。",
    articles: ["pyramids", "roman-aqueducts", "wooden-architecture", "bridge-strength"]
  },
  {
    id: "things-that-traveled", no: "06", en: "THINGS THAT TRAVELED", cover: "culture",
    title: "世界をめぐった、食べ物と服",
    lead: "コーヒー、ラーメン、ジーンズ。今では当たり前のものも、長い旅をして私たちのもとに届きました。",
    articles: ["coffee", "ramen", "jeans", "silk-road"]
  },
  {
    id: "world-history", no: "07", en: "WORLD HISTORY", cover: "history",
    title: "世界史の流れ　36話で読む通史",
    lead: "メソポタミアの最初の都市から、冷戦のあとの今まで。1話に1つの「なぜ？」を追いながら、順番に読めば世界史の流れが1本につながります。",
    note: "時代区分（古代・中世・近世・近代・現代）は、日本の世界史の教科書でよく使われる分け方にならったこのサイトの区分です。境目は地域や学者によって異なります。",
    /* parts：6部の区切り。count は各部の話数（articles の順に割り当てる） */
    parts: [
      { no: "01", en: "THE FIRST CIVILIZATIONS", era: "古代", title: "文明のはじまり", span: "前3500〜前500年", count: 6 },
      { no: "02", en: "CLASSICAL EMPIRES", era: "古代", title: "古典の帝国", span: "前500〜後500年", count: 6 },
      { no: "03", en: "FAITH & TRADE", era: "中世", title: "信仰と交易", span: "500〜1300年", count: 6 },
      { no: "04", en: "THE WORLD CONNECTS", era: "中世〜近世", title: "世界がつながる", span: "1300〜1700年", count: 6 },
      { no: "05", en: "THE MODERN AGE", era: "近世〜近代", title: "近代の誕生", span: "1550〜1912年", count: 6 },
      { no: "06", en: "THE 20TH CENTURY TO NOW", era: "現代", title: "20世紀から今へ", span: "1914年〜現在", count: 6 }
    ],
    articles: ["wh01-river-civilizations", "wh02-egypt", "wh03-kanji-origin", "wh04-alphabet", "wh05-persia", "wh06-axial-age", "wh07-athens-democracy", "wh08-alexander", "wh09-rome-rise", "wh10-qin-han", "wh11-han-and-rome", "wh12-fall-of-rome", "wh13-islam", "wh14-tang-changan", "wh15-medieval-church", "wh16-song-china", "wh17-crusades", "wh18-mongol-empire", "wh19-plague-renaissance", "wh20-inca-aztec", "wh21-columbus", "wh22-reformation", "wh23-asian-empires", "wh24-edo-silver", "wh25-scientific-revolution", "wh26-revolutions", "wh27-nations", "wh28-industrial-revolution", "wh29-imperialism", "wh30-meiji-opium", "wh31-ww1", "wh32-depression", "wh33-ww2", "wh34-cold-war", "wh35-decolonization", "wh36-after-cold-war"]
  }
];
