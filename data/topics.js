/* SOMOSOMO（そもそも） — カテゴリと記事（疑問）の目録。
   記事を足す・公開するときは、ここだけを書き換える。
   status: "soon"（準備中）| "published"（公開中。公開したら articles/<slug>.html を作る）
   tags: 検索のキーワード（人気のキーワードとつながる） */
window.ZUKAN = {
  categories: [
    { id: "nature",  no: "01", name: "自然・科学",   en: "NATURE & SCIENCE",    desc: "生き物、宇宙、地球、体。自然のしくみをのぞく。" },
    { id: "history", no: "02", name: "歴史・地理",   en: "HISTORY & GEOGRAPHY", desc: "国の成り立ち、古代の技術、地図から読む世界。" },
    { id: "society", no: "03", name: "社会・経済",   en: "SOCIETY & ECONOMY",   desc: "お金、お店、交通、都市。暮らしを支える社会のしくみ。" },
    { id: "mind",    no: "04", name: "人間・心理",   en: "HUMAN & MIND",        desc: "記憶、注意、人間関係。脳と心のクセを知る。" },
    { id: "tech",    no: "05", name: "技術・発明",   en: "TECHNOLOGY",          desc: "飛行機、スマホ、橋、ネット。未来をつくる技術。" },
    { id: "culture", no: "06", name: "文化・暮らし", en: "CULTURE & LIFE",      desc: "食、服、建物、時間。暮らしを彩るものの由来。" }
  ],

  /* 最初に制作する5本（この順で公開する） */
  picks: ["konbini-restock", "airplane-flight", "sns-time", "singapore"],

  /* 検索ページに出す人気のキーワード */
  keywords: ["宇宙", "脳", "お金", "地図", "建築", "食べ物", "乗り物", "スマホ", "古代"],

  topics: [
    { no: 1,  slug: "bee-vision",          cat: "nature",  q: "ハチは、世界をどう見ている？",                         tags: ["生き物", "目"],             related: ["color-vision", "overlooking", "whale-size"] },
    { no: 2,  slug: "whale-size",          cat: "nature",  q: "クジラは、なぜあんなに大きいのか？",                   tags: ["生き物", "海"],             related: ["bee-vision", "bridge-strength"] },
    { no: 3,  slug: "color-vision",        cat: "nature",  q: "目は、どうやって色を見分けている？",                   tags: ["目", "体", "脳"],           related: ["bee-vision", "overlooking", "forgetting"] },
    { no: 4,  slug: "lightning",           cat: "nature",  q: "雷は、どうやって空から落ちてくる？",                   tags: ["天気", "空", "電気"],       related: ["saturn-rings", "time-zones"], status: "published", date: "2026-10-22",
      cover: { src: "images/lightning/cover.jpg", small: "images/lightning/cover_s.jpg", title: "Lightning in Dallas", artist: "NOAA Photo Library", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Lightning_in_Dallas_2015.jpg" } },
    { no: 5,  slug: "saturn-rings",        cat: "nature",  q: "土星の輪は、何でできている？",                         tags: ["宇宙"],                     related: ["lightning", "time-zones"] },

    { no: 7,  slug: "roman-aqueducts",     cat: "history", q: "古代ローマ人は、どうやって水を街まで運んだ？",         tags: ["古代", "建築", "水"],       related: ["pyramids", "bridge-strength"], status: "published", date: "2026-10-22",
      cover: { src: "images/roman-aqueducts/cover.jpg", small: "images/roman-aqueducts/cover_s.jpg", title: "Pont du Gard", artist: "Pixabay ユーザー 2990108", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Pont_Du_Gard_Nimes_Arles_Ales_Viaduct_Aqueduct.jpg" } },
    { no: 8,  slug: "pyramids",            cat: "history", q: "ピラミッドは、どうやって建てられた？",                 tags: ["古代", "建築"],             related: ["roman-aqueducts", "wooden-architecture"] },
    { no: 9,  slug: "singapore",           cat: "history", q: "シンガポールは、なぜ豊かな国になった？",               tags: ["国", "地図", "お金", "アジア"], related: ["global-shipping", "city-rent", "silk-road"], status: "published", date: "2026-10-21",
      cover: { src: "images/singapore/cover.jpg", small: "images/singapore/cover_s.jpg", title: "Skyline of the Central Business District of Singapore", artist: "Jason Goh", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Skyline_of_the_Central_Business_District_of_Singapore_seen_from_across_Marina_Bay_-_20140129.jpg" } },
    { no: 10, slug: "silk-road",           cat: "history", q: "シルクロードでは、何が運ばれていた？",                 tags: ["古代", "交易", "地図"],     related: ["coffee", "global-shipping"] },

    { no: 11, slug: "konbini-restock",     cat: "society", q: "コンビニは、なぜ毎日商品を補充できる？",               tags: ["お店", "物流", "コンビニ"],  related: ["global-shipping", "pricing"], status: "published", date: "2026-10-21",
      cover: { src: "images/konbini-restock/cover.jpg", small: "images/konbini-restock/cover_s.jpg", title: "Seven-Eleven Oita Matsubaramachi Store", artist: "MaedaAkihiko", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:7-Eleven_Oita-Matsubaramachi-Store.jpg" } },
    { no: 12, slug: "bank-money",          cat: "society", q: "銀行は、預かったお金をどう使っている？",               tags: ["お金"],                     related: ["pricing", "city-rent"] },
    { no: 13, slug: "train-punctuality",   cat: "society", q: "電車は、なぜ秒単位で運行できる？",                     tags: ["乗り物", "鉄道"],           related: ["konbini-restock", "internet-delivery"], status: "published", date: "2026-10-22",
      cover: { src: "images/train-punctuality/cover.jpg", small: "images/train-punctuality/cover_s.jpg", title: "Chuo Line E233 series T27 Tokyo", artist: "KibaShinichi", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Chuo_Line_E233_series_T27_Tokyo_20091218.jpg" } },
    { no: 14, slug: "pricing",             cat: "society", q: "商品の値段は、どうやって決まる？",                     tags: ["お金", "お店"],             related: ["bank-money", "too-many-choices"] },
    { no: 15, slug: "city-rent",           cat: "society", q: "都会の家賃は、なぜ高い？",                             tags: ["お金", "都市"],             related: ["singapore", "pricing"] },

    { no: 16, slug: "forgetting",          cat: "mind",    q: "人は、なぜ忘れるようにできている？",                   tags: ["脳", "記憶"],               related: ["overlooking", "sns-time"], status: "published", date: "2026-10-22",
      cover: { src: "images/forgetting/cover.jpg", small: "images/forgetting/cover_s.jpg", title: "Morning fog", artist: "Ted Moravec", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Morning_fog_(51636862816).jpg" } },
    { no: 17, slug: "overlooking",         cat: "mind",    q: "目の前にあるのに、なぜ見落とす？",                     tags: ["脳", "目"],                 related: ["forgetting", "color-vision"] },
    { no: 18, slug: "sns-time",            cat: "mind",    q: "SNSを見ていると、時間があっという間に過ぎるのはなぜ？", tags: ["脳", "スマホ", "SNS", "時間"], related: ["too-many-choices", "forgetting", "inside-smartphone"], status: "published", date: "2026-10-21",
      cover: { src: "images/sns-time/cover.jpg", small: "images/sns-time/cover_s.jpg", title: "Hands, coffee, smartphone", artist: "Pixel.la Free Stock Photos", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Hands-coffee-smartphone-technology_(23698591814).jpg" } },
    { no: 19, slug: "easy-to-talk",        cat: "mind",    q: "初対面なのに、話しやすい人がいるのはなぜ？",           tags: ["人間関係", "脳"],           related: ["sns-time", "overlooking"] },
    { no: 20, slug: "too-many-choices",    cat: "mind",    q: "選択肢が多いと、なぜ決められなくなる？",               tags: ["脳", "お店"],               related: ["pricing", "sns-time"] },

    { no: 21, slug: "airplane-flight",     cat: "tech",    q: "飛行機は、どうやって空を飛ぶ？",                       tags: ["乗り物", "空", "物理"],     related: ["global-shipping", "bridge-strength"], status: "published", date: "2026-10-21",
      cover: { src: "images/airplane-flight/cover.jpg", small: "images/airplane-flight/cover_s.jpg", title: "A wing tip of an airplane", artist: "U.S. Department of Agriculture", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:A_wing_tip_of_an_airplane_(40118125441).jpg" } },
    { no: 22, slug: "inside-smartphone",   cat: "tech",    q: "スマホの中には、何が入っている？",                     tags: ["スマホ"],                   related: ["internet-delivery", "sns-time"] },
    { no: 23, slug: "global-shipping",     cat: "tech",    q: "世界の荷物は、どうやって運ばれている？",               tags: ["物流", "乗り物", "地図"],   related: ["konbini-restock", "airplane-flight", "silk-road"] },
    { no: 24, slug: "bridge-strength",     cat: "tech",    q: "大きな橋は、なぜ自分の重さで崩れない？",               tags: ["建築", "橋"],               related: ["roman-aqueducts", "wooden-architecture"], status: "published", date: "2026-10-22",
      cover: { src: "images/bridge-strength/cover.jpg", small: "images/bridge-strength/cover_s.jpg", title: "Akashi Kaikyo Ohashi", artist: "Pinqui", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Akashi_Kaikyo_Ohashi_01.jpg" } },
    { no: 25, slug: "internet-delivery",   cat: "tech",    q: "インターネットの情報は、どうやって届く？",             tags: ["スマホ", "通信"],           related: ["inside-smartphone", "train-punctuality"] },

    { no: 26, slug: "ramen",               cat: "culture", q: "ラーメンは、どうやって日本の国民食になった？",         tags: ["食べ物", "日本"],           related: ["coffee", "konbini-restock"] },
    { no: 27, slug: "coffee",              cat: "culture", q: "コーヒーは、どうやって世界中に広まった？",             tags: ["食べ物", "交易", "コーヒー"], related: ["silk-road", "ramen"], status: "published", date: "2026-10-22",
      cover: { src: "images/coffee/cover.jpg", small: "images/coffee/cover_s.jpg", title: "Coffee cherries", artist: "Scot Nelson", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Coffee_cherries.jpg" } },
    { no: 28, slug: "jeans",               cat: "culture", q: "ジーンズは、なぜ世界中で履かれるようになった？",       tags: ["ファッション"],             related: ["coffee", "global-shipping"] },
    { no: 29, slug: "wooden-architecture", cat: "culture", q: "日本の木造建築は、なぜ長く残る？",                     tags: ["建築", "日本"],             related: ["bridge-strength", "pyramids"] },
    { no: 30, slug: "time-zones",          cat: "culture", q: "世界には、なぜ時差がある？",                           tags: ["地図", "宇宙"],             related: ["train-punctuality", "saturn-rings"] }
  ].map(function (t) { t.status = t.status || "soon"; t.minutes = t.minutes || 5; t.tags = t.tags || []; return t; })
};
