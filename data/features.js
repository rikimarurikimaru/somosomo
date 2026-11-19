/* SOMOSOMO（そもそも） — テーマ特集の目録。
   特集＝関連する記事を「読む順番」に並べて、1つのテーマを深掘りできるようにしたもの。
   articles の順番がそのまま「この特集の読み方」になる。intro は扉の下に出す紹介文（記事の答えは書かない）。cover は背景写真を借りるカテゴリ。 */
window.ZUKAN_FEATURES = [
  {
    id: "map-and-nations", no: "01", en: "MAPS & NATIONS", cover: "history",
    title: "国の運命は、地図で決まる？",
    lead: "大国にはさまれた小さな国、海の交差点で栄えた島。地図を広げると、国の歴史が違って見えてきます。",
    intro: ["国の豊かさや運命は、そこに住む人の努力だけで決まるのでしょうか。それとも、地図の上の「場所」が大きく関わっているのでしょうか。", "東南アジアの小さな島国、ユーラシアを横切った長い交易の道、そして地球に引かれた時刻の境目。3つの話を順に読むと、地図を見る目が少し変わるはずです。", "まずはシンガポールから。地図帳を手元に置いて読むのもおすすめです。"],
    articles: ["singapore", "silk-road", "time-zones"]
  },
  {
    id: "everyday-systems", no: "02", en: "EVERYDAY SYSTEMS", cover: "society",
    title: "「当たり前」の裏側にある、すごいしくみ",
    lead: "棚に並ぶお弁当、時間どおりの電車、すぐ届くメッセージ。毎日のふつうを支える見えない仕組みを順番にのぞきます。",
    intro: ["朝のコンビニに並ぶおにぎり、時刻表どおりに来る電車、海の向こうから届く荷物、一瞬で届くメッセージ、銀行に預けたお金。どれも毎日あたりまえに使っているものです。", "でも、そのあたりまえを支えるしくみを、説明できるでしょうか。この特集では、身近なものから順に、見えない裏側をのぞいていきます。", "1本目はコンビニ。読み終えるころには、いつもの景色の見え方が変わっているかもしれません。"],
    articles: ["konbini-restock", "train-punctuality", "global-shipping", "internet-delivery", "bank-money"]
  },
  {
    id: "unreliable-brain", no: "03", en: "THE UNRELIABLE BRAIN", cover: "mind",
    title: "脳は、思ったよりあてにならない",
    lead: "忘れる、見落とす、時間を忘れる、決められない。うっかりの正体は、脳がもともと持っているクセでした。",
    intro: ["覚えたはずのことを忘れる。目の前の物を見落とす。気づけば時間が過ぎている。選べなくて迷う。初対面でも話しやすい人がいる。", "どれも、だれにでもある「うっかり」や「不思議」です。でも、それは本当に失敗なのでしょうか。", "脳のしくみを5つの疑問からのぞきます。順に読むと、自分の頭との付き合い方が少し変わるかもしれません。"],
    articles: ["forgetting", "overlooking", "sns-time", "too-many-choices", "easy-to-talk"]
  },
  {
    id: "sky-and-space", no: "04", en: "SKY & SPACE", cover: "nature",
    title: "空と宇宙の、見えない力",
    lead: "飛行機を浮かせる力、雷を落とす力、土星の輪をつくる力。頭の上で起きていることを、図解でつかみます。",
    intro: ["何百人も乗せた飛行機は、なぜ空に浮いていられるのでしょう。雷はどうやって落ちてくるのでしょう。土星の輪は、何でできているのでしょう。", "見上げた空の向こうでは、目に見えない力がはたらいています。身近な空から始めて、宇宙へ、そして地球の自転がつくる時差へと、少しずつ視野を広げていきます。", "まずは飛行機から。次に空を見上げるのが楽しみになる4本です。"],
    articles: ["airplane-flight", "lightning", "saturn-rings", "time-zones"]
  },
  {
    id: "ancient-engineering", no: "05", en: "ANCIENT ENGINEERING", cover: "tech",
    title: "何百年も残る建物の、ひみつ",
    lead: "ピラミッド、ローマの水道、日本の木造建築、巨大な橋。時代をこえて残るものには、共通する知恵がありました。",
    intro: ["コンクリートも重機もない時代に、人はどうやって何百年、何千年と残るものを造ったのでしょう。", "エジプトのピラミッド、ローマの水道、日本の木造の寺、そして巨大な橋。時代も場所もばらばらですが、読み比べると、長く残るものに共通する考え方が見えてきます。", "古い順に4本。昔の技術者の頭の中をのぞいてみてください。"],
    articles: ["pyramids", "roman-aqueducts", "wooden-architecture", "bridge-strength"]
  },
  {
    id: "things-that-traveled", no: "06", en: "THINGS THAT TRAVELED", cover: "culture",
    title: "世界をめぐった、食べ物と服",
    lead: "コーヒー、ラーメン、ジーンズ。今では当たり前のものも、長い旅をして私たちのもとに届きました。",
    intro: ["毎朝のコーヒー、昼のラーメン、いつものジーンズ。生まれたときからそこにあったような顔をしていますが、どれも長い旅をして私たちのもとに届きました。", "どこで生まれ、だれが運び、どうやって広まったのか。旅の道すじをたどると、世界の歴史の大きな流れも見えてきます。", "最後は、ものと人が行き交った道そのもの、シルクロードへ。4本で世界を一周します。"],
    articles: ["coffee", "ramen", "jeans", "silk-road"]
  },
  {
    id: "world-history", no: "07", en: "WORLD HISTORY", cover: "history",
    title: "世界史の流れ　36話で読む通史",
    lead: "メソポタミアの最初の都市から、冷戦のあとの今まで。1話に1つの「なぜ？」を追いながら、順番に読めば世界史の流れが1本につながります。",
    note: "時代区分（古代・中世・近世・近代・現代）は、日本の世界史の教科書でよく使われる分け方にならったこのサイトの区分です。境目は地域や学者によって異なります。",
    /* parts：6部の区切り。count は各部の話数（articles の順に割り当てる）。color は目次の背表紙と部の見出しの色。img は目次と部の扉の写真（その部の記事の中の写真から、表紙と重ならないものを選ぶ） */
    parts: [
      { no: "01", en: "THE FIRST CIVILIZATIONS", era: "古代", title: "文明のはじまり", span: "前3500〜前500年", count: 6, img: "images/wh02-egypt/aswan.jpg", color: "#d8b06a" },
      { no: "02", en: "CLASSICAL EMPIRES", era: "古代", title: "古典の帝国", span: "前500〜後500年", count: 6, img: "images/wh09-rome-rise/appia.jpg", color: "#7f9157" },
      { no: "03", en: "FAITH & TRADE", era: "中世", title: "信仰と交易", span: "500〜1300年", count: 6, img: "images/wh16-song-china/hangzhou.jpg", color: "#2d5878" },
      { no: "04", en: "THE WORLD CONNECTS", era: "中世〜近世", title: "世界がつながる", span: "1300〜1700年", count: 6, img: "images/wh23-asian-empires/suleymaniye.jpg", color: "#b3242f" },
      { no: "05", en: "THE MODERN AGE", era: "近世〜近代", title: "近代の誕生", span: "1550〜1912年", count: 6, img: "images/wh28-industrial-revolution/manchester.jpg", color: "#5b4a75" },
      { no: "06", en: "THE 20TH CENTURY TO NOW", era: "現代", title: "20世紀から今へ", span: "1914年〜現在", count: 6, img: "images/wh32-depression/dam.jpg", color: "#23211d" }
    ],
    intro: ["世界史は、覚えることが多すぎて苦手だった。そんな人にこそ読んでほしい連載です。", "最初の都市が生まれた紀元前から、冷戦が終わったあとの今まで。1話に1つの「なぜ？」を追いかけながら、36話を順に読むと、ばらばらだった出来事が1本の流れにつながるように作っています。", "各話の最初に「前回のあらすじ」、最後に「次の話へ」があるので、どこからでも戻れます。まずは第1話から、気軽に読み始めてください。"],
    articles: ["wh01-river-civilizations", "wh02-egypt", "wh03-kanji-origin", "wh04-alphabet", "wh05-persia", "wh06-axial-age", "wh07-athens-democracy", "wh08-alexander", "wh09-rome-rise", "wh10-qin-han", "wh11-han-and-rome", "wh12-fall-of-rome", "wh13-islam", "wh14-tang-changan", "wh15-medieval-church", "wh16-song-china", "wh17-crusades", "wh18-mongol-empire", "wh19-plague-renaissance", "wh20-inca-aztec", "wh21-columbus", "wh22-reformation", "wh23-asian-empires", "wh24-edo-silver", "wh25-scientific-revolution", "wh26-revolutions", "wh27-nations", "wh28-industrial-revolution", "wh29-imperialism", "wh30-meiji-opium", "wh31-ww1", "wh32-depression", "wh33-ww2", "wh34-cold-war", "wh35-decolonization", "wh36-after-cold-war"]
  }
];
