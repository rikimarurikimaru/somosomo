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
    { id: "culture", no: "06", name: "文化・暮らし", en: "CULTURE & LIFE",      desc: "食、服、建物、時間。暮らしを彩るものの由来。" },
    { id: "ent",     no: "07", name: "エンタメ",     en: "ENTERTAINMENT",       desc: "アニメ、映画、マンガ、ゲーム。作品の裏側と、作者が込めたもの。" }
  ],

  /* 最初に制作する5本（この順で公開する） */
  picks: ["konbini-restock", "airplane-flight", "sns-time", "singapore"],

  /* 検索ページに出す人気のキーワード */
  keywords: ["宇宙", "脳", "お金", "地図", "建築", "食べ物", "乗り物", "スマホ", "古代"],

  topics: [
    { no: 1,  slug: "bee-vision",          cat: "nature",  q: "ハチは、世界をどう見ている？",                         tags: ["生き物", "目", "ハチ"],       related: ["color-vision", "overlooking", "whale-size"], status: "published", date: "2026-10-22",
      cover: { src: "images/bee-vision/cover.jpg", small: "images/bee-vision/cover_s.jpg", title: "European honey bee extracts nectar", artist: "John Severns", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:European_honey_bee_extracts_nectar.jpg" } },
    { no: 2,  slug: "whale-size",          cat: "nature",  q: "クジラは、なぜあんなに大きいのか？",                   tags: ["生き物", "海"],             related: ["bee-vision", "bridge-strength"], status: "published", date: "2026-10-23",
      cover: { src: "images/whale-size/cover.jpg", small: "images/whale-size/cover_s.jpg", title: "Anim1754 - Flickr - NOAA Photo Library", artist: "NOAA Photo Library", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg" } },
    { no: 3,  slug: "color-vision",        cat: "nature",  q: "目は、どうやって色を見分けている？",                   tags: ["目", "体", "脳"],           related: ["bee-vision", "overlooking", "forgetting"], status: "published", date: "2026-10-23",
      cover: { src: "images/color-vision/cover.jpg", small: "images/color-vision/cover_s.jpg", title: "Prism flat rainbow (cropped)", artist: "Kelvinsong", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Prism_flat_rainbow_(cropped).jpg" } },
    { no: 4,  slug: "lightning",           cat: "nature",  q: "雷は、どうやって空から落ちてくる？",                   tags: ["天気", "空", "電気"],       related: ["saturn-rings", "time-zones"], status: "published", date: "2026-10-22",
      cover: { src: "images/lightning/cover.jpg", small: "images/lightning/cover_s.jpg", title: "Lightning in Dallas", artist: "NOAA Photo Library", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Lightning_in_Dallas_2015.jpg" } },
    { no: 5,  slug: "saturn-rings",        cat: "nature",  q: "土星の輪は、何でできている？",                         tags: ["宇宙"],                     related: ["lightning", "time-zones"], status: "published", date: "2026-10-24",
      cover: { src: "images/saturn-rings/cover.jpg", small: "images/saturn-rings/cover_s.jpg", title: "Top view of the rings of Saturn by Cassini - October 10, 2013", artist: "NASA/JPL-Caltech/SSI/Cornell", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Top_view_of_the_rings_of_Saturn_by_Cassini_-_October_10,_2013.jpg" } },

    { no: 7,  slug: "roman-aqueducts",     cat: "history", q: "古代ローマ人は、どうやって水を街まで運んだ？",         tags: ["古代", "建築", "水"],       related: ["pyramids", "bridge-strength"], status: "published", date: "2026-10-22",
      cover: { src: "images/roman-aqueducts/cover.jpg", small: "images/roman-aqueducts/cover_s.jpg", title: "Pont du Gard", artist: "Pixabay ユーザー 2990108", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Pont_Du_Gard_Nimes_Arles_Ales_Viaduct_Aqueduct.jpg" } },
    { no: 8,  slug: "pyramids",            cat: "history", q: "ピラミッドは、どうやって建てられた？",                 tags: ["古代", "建築", "エジプト"],   related: ["roman-aqueducts", "wooden-architecture"], status: "published", date: "2026-10-22",
      cover: { src: "images/pyramids/cover.jpg", small: "images/pyramids/cover_s.jpg", title: "Great Pyramid (Pyramid of Cheops Khufu)", artist: "Warren LeMay", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Great_Pyramid_(Pyramid_of_Cheops_Khufu),_Giza,_GG,_EGY_(40936203693).jpg" } },
    { no: 9,  slug: "singapore",           cat: "history", q: "シンガポールは、なぜ豊かな国になった？",               tags: ["国", "地図", "お金", "アジア"], related: ["global-shipping", "city-rent", "silk-road"], status: "published", date: "2026-10-21",
      cover: { src: "images/singapore/cover.jpg", small: "images/singapore/cover_s.jpg", title: "Skyline of the Central Business District of Singapore", artist: "Jason Goh", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Skyline_of_the_Central_Business_District_of_Singapore_seen_from_across_Marina_Bay_-_20140129.jpg" } },
    { no: 10, slug: "silk-road",           cat: "history", q: "シルクロードでは、何が運ばれていた？",                 tags: ["古代", "交易", "地図"],     related: ["coffee", "global-shipping"], status: "published", date: "2026-10-23",
      cover: { src: "images/silk-road/cover.jpg", small: "images/silk-road/cover_s.jpg", title: "Caravane sur la Route de la soie（カタルーニャ地図の部分）", artist: "アブラハム・クレスケス", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Caravane_sur_la_Route_de_la_soie_-_Atlas_catalan.jpg" } },

    { no: 11, slug: "konbini-restock",     cat: "society", q: "コンビニは、なぜ毎日商品を補充できる？",               tags: ["お店", "物流", "コンビニ"],  related: ["global-shipping", "pricing"], status: "published", date: "2026-10-21",
      cover: { src: "images/konbini-restock/cover.jpg", small: "images/konbini-restock/cover_s.jpg", title: "Seven-Eleven Oita Matsubaramachi Store", artist: "MaedaAkihiko", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:7-Eleven_Oita-Matsubaramachi-Store.jpg" } },
    { no: 12, slug: "bank-money",          cat: "society", q: "銀行は、預かったお金をどう使っている？",               tags: ["お金"],                     related: ["pricing", "city-rent"], status: "published", date: "2026-10-23",
      cover: { src: "images/bank-money/cover.jpg", small: "images/bank-money/cover_s.jpg", title: "春の日本銀行", artist: "Souka Kinmei", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:%E6%98%A5%E3%81%AE%E6%97%A5%E6%9C%AC%E9%8A%80%E8%A1%8C.jpg" } },
    { no: 13, slug: "train-punctuality",   cat: "society", q: "電車は、なぜ秒単位で運行できる？",                     tags: ["乗り物", "鉄道"],           related: ["konbini-restock", "internet-delivery"], status: "published", date: "2026-10-22",
      cover: { src: "images/train-punctuality/cover.jpg", small: "images/train-punctuality/cover_s.jpg", title: "Chuo Line E233 series T27 Tokyo", artist: "KibaShinichi", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Chuo_Line_E233_series_T27_Tokyo_20091218.jpg" } },
    { no: 14, slug: "pricing",             cat: "society", q: "商品の値段は、どうやって決まる？",                     tags: ["お金", "お店"],             related: ["bank-money", "too-many-choices"], status: "published", date: "2026-10-22",
      cover: { src: "images/pricing/cover.jpg", small: "images/pricing/cover_s.jpg", title: "Food shops in Japan", artist: "Daderot", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Food_shops_in_Japan_-_DSC05043.JPG" } },
    { no: 15, slug: "city-rent",           cat: "society", q: "都会の家賃は、なぜ高い？",                             tags: ["お金", "都市"],             related: ["singapore", "pricing"], status: "published", date: "2026-10-23",
      cover: { src: "images/city-rent/cover.jpg", small: "images/city-rent/cover_s.jpg", title: "Shinjuku Park Tower, NTT East, and Tokyo Opera City", artist: "Jason Goh", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Shinjuku_Park_Tower,_NTT_East,_and_Tokyo_Opera_City,_view_from_the_Tokyo_Metropolitan_Government_Building_No.2_(2013-06-07_by_Jason_Goh_@Pixabay_217878).jpg" } },

    { no: 16, slug: "forgetting",          cat: "mind",    q: "人は、なぜ忘れるようにできている？",                   tags: ["脳", "記憶"],               related: ["overlooking", "sns-time"], status: "published", date: "2026-10-22",
      cover: { src: "images/forgetting/cover.jpg", small: "images/forgetting/cover_s.jpg", title: "Morning fog", artist: "Ted Moravec", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Morning_fog_(51636862816).jpg" } },
    { no: 17, slug: "overlooking",         cat: "mind",    q: "目の前にあるのに、なぜ見落とす？",                     tags: ["脳", "目"],                 related: ["forgetting", "color-vision"], status: "published", date: "2026-10-22",
      cover: { src: "images/overlooking/cover.jpg", small: "images/overlooking/cover_s.jpg", title: "Shibuya crossing", artist: "Syced", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Shibuya_crossing_(12214).jpg" } },
    { no: 18, slug: "sns-time",            cat: "mind",    q: "SNSを見ていると、時間があっという間に過ぎるのはなぜ？", tags: ["脳", "スマホ", "SNS", "時間"], related: ["too-many-choices", "forgetting", "inside-smartphone"], status: "published", date: "2026-10-21",
      cover: { src: "images/sns-time/cover.jpg", small: "images/sns-time/cover_s.jpg", title: "Hands, coffee, smartphone", artist: "Pixel.la Free Stock Photos", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Hands-coffee-smartphone-technology_(23698591814).jpg" } },
    { no: 19, slug: "easy-to-talk",        cat: "mind",    q: "初対面なのに、話しやすい人がいるのはなぜ？",           tags: ["人間関係", "脳"],           related: ["sns-time", "overlooking"], status: "published", date: "2026-10-23",
      cover: { src: "images/easy-to-talk/cover.jpg", small: "images/easy-to-talk/cover_s.jpg", title: "Coffee Talks", artist: "Joshua Ness", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Coffee_Talks_(Unsplash).jpg" } },
    { no: 20, slug: "too-many-choices",    cat: "mind",    q: "選択肢が多いと、なぜ決められなくなる？",               tags: ["脳", "お店"],               related: ["pricing", "sns-time"], status: "published", date: "2026-10-24",
      cover: { src: "images/too-many-choices/cover.jpg", small: "images/too-many-choices/cover_s.jpg", title: "Spice Supermarket Japan", artist: "Kanesue", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Spice_Supermarket_Japan.JPG" } },

    { no: 21, slug: "airplane-flight",     cat: "tech",    q: "飛行機は、どうやって空を飛ぶ？",                       tags: ["乗り物", "空", "物理"],     related: ["global-shipping", "bridge-strength"], status: "published", date: "2026-10-21",
      cover: { src: "images/airplane-flight/cover.jpg", small: "images/airplane-flight/cover_s.jpg", title: "A wing tip of an airplane", artist: "U.S. Department of Agriculture", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:A_wing_tip_of_an_airplane_(40118125441).jpg" } },
    { no: 22, slug: "inside-smartphone",   cat: "tech",    q: "スマホの中には、何が入っている？",                     tags: ["スマホ"],                   related: ["internet-delivery", "sns-time"], status: "published", date: "2026-10-22",
      cover: { src: "images/inside-smartphone/cover.jpg", small: "images/inside-smartphone/cover_s.jpg", title: "samsung phone", artist: "Techbubble", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:17456805020661182164462740776729_samsung_phone.jpg" } },
    { no: 23, slug: "global-shipping",     cat: "tech",    q: "世界の荷物は、どうやって運ばれている？",               tags: ["物流", "乗り物", "地図"],   related: ["konbini-restock", "airplane-flight", "silk-road"], status: "published", date: "2026-10-24",
      cover: { src: "images/global-shipping/cover.jpg", small: "images/global-shipping/cover_s.jpg", title: "Shipping containers in a port", artist: "Igor Ovsyannykov", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Shipping_containers_in_a_port_(Unsplash).jpg" } },
    { no: 24, slug: "bridge-strength",     cat: "tech",    q: "大きな橋は、なぜ自分の重さで崩れない？",               tags: ["建築", "橋"],               related: ["roman-aqueducts", "wooden-architecture"], status: "published", date: "2026-10-22",
      cover: { src: "images/bridge-strength/cover.jpg", small: "images/bridge-strength/cover_s.jpg", title: "Akashi Kaikyo Ohashi", artist: "Pinqui", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Akashi_Kaikyo_Ohashi_01.jpg" } },
    { no: 25, slug: "internet-delivery",   cat: "tech",    q: "インターネットの情報は、どうやって届く？",             tags: ["スマホ", "通信"],           related: ["inside-smartphone", "train-punctuality"], status: "published", date: "2026-10-23",
      cover: { src: "images/internet-delivery/cover.jpg", small: "images/internet-delivery/cover_s.jpg", title: "Fiber Optics Cables", artist: "Donald Huebler / NASA", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:FIBER_OPTICS_CABLES_-_NARA_-_17496514.jpg" } },

    { no: 26, slug: "ramen",               cat: "culture", q: "ラーメンは、どうやって日本の国民食になった？",         tags: ["食べ物", "日本"],           related: ["coffee", "konbini-restock"], status: "published", date: "2026-10-22",
      cover: { src: "images/ramen/cover.jpg", small: "images/ramen/cover_s.jpg", title: "Tsugaru ramen 001", artist: "Ocdp", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Tsugaru_ramen_001.jpg" } },
    { no: 27, slug: "coffee",              cat: "culture", q: "コーヒーは、どうやって世界中に広まった？",             tags: ["食べ物", "交易", "コーヒー"], related: ["silk-road", "ramen"], status: "published", date: "2026-10-22",
      cover: { src: "images/coffee/cover.jpg", small: "images/coffee/cover_s.jpg", title: "Coffee cherries", artist: "Scot Nelson", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Coffee_cherries.jpg" } },
    { no: 28, slug: "jeans",               cat: "culture", q: "ジーンズは、なぜ世界中ではかれるようになった？",       tags: ["ファッション"],             related: ["coffee", "global-shipping"], status: "published", date: "2026-10-23",
      cover: { src: "images/jeans/cover.jpg", small: "images/jeans/cover_s.jpg", title: "Denim jeans wrinkled", artist: "Deb Tremper", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Denim_jeans_wrinkled.jpg" } },
    { no: 29, slug: "wooden-architecture", cat: "culture", q: "日本の木造建築は、なぜ長く残る？",                     tags: ["建築", "日本"],             related: ["bridge-strength", "pyramids"], status: "published", date: "2026-10-24",
      cover: { src: "images/wooden-architecture/cover.jpg", small: "images/wooden-architecture/cover_s.jpg", title: "Horyu-ji Kondo and Five-story Pagoda 2022", artist: "ONO Masanobu", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Horyu-ji_Kondo_and_Five-story_Pagoda_2022.jpg" } },
    { no: 30, slug: "time-zones",          cat: "culture", q: "世界には、なぜ時差がある？",                           tags: ["地図", "宇宙"],             related: ["train-punctuality", "saturn-rings"], status: "published", date: "2026-10-24",
      cover: { src: "images/time-zones/cover.jpg", small: "images/time-zones/cover_s.jpg", title: "Artemis II Captures the Terminator Line", artist: "Reid Wiseman (NASA)", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Artemis_II_Captures_the_Terminator_Line_(art002e000190).jpg" } },

    /* 2026-10-29 決めた次の40本（題名のルールは CLAUDE.md の「題名の決まり」） */
    { no: 32, slug: "cat-falling", cat: "nature", q: "猫は、なぜ高い所から落ちても平気？", tags: ["生き物", "体"], related: ["mosquito-bites"], status: "published", date: "2026-10-29",
      cover: { src: "images/cat-falling/cover.jpg", small: "images/cat-falling/cover_s.jpg", title: "Cats on roof 02", artist: "Judgefloro", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Cats_on_roof_02.jpg" } },
    { no: 33, slug: "onion-tears", cat: "nature", q: "玉ねぎを切ると、なぜ涙が出る？", tags: ["食べ物", "体"], related: ["mosquito-bites"], status: "published", date: "2026-10-31",
      cover: { src: "images/onion-tears/cover.jpg", small: "images/onion-tears/cover_s.jpg", title: "Onions 002", artist: "Ocdp", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Onions_002.jpg" } },
    { no: 34, slug: "mosquito-bites", cat: "nature", q: "蚊は、なぜ同じ人ばかり刺す？", tags: ["生き物", "体"], related: ["onion-tears", "cat-falling"] },
    { no: 46, slug: "tickling", cat: "mind", q: "自分でくすぐっても、なぜくすぐったくない？", tags: ["脳", "体"], related: ["recorded-voice"] },
    { no: 47, slug: "recorded-voice", cat: "mind", q: "録音した自分の声は、なぜ変に聞こえる？", tags: ["脳", "音"], related: ["tickling", "chalkboard-sound"] },
    { no: 50, slug: "chalkboard-sound", cat: "mind", q: "黒板をひっかく音は、なぜゾッとする？", tags: ["脳", "音"], related: ["recorded-voice", "tickling"] },
    { no: 52, slug: "microwave-cold-center", cat: "tech", q: "電子レンジで温めると、なぜ真ん中だけ冷たい？", tags: ["家電", "食べ物"], related: [] },
    { no: 54, slug: "round-windows", cat: "tech", q: "飛行機の窓は、なぜ丸い？", tags: ["乗り物", "空"], related: ["airplane-flight"] },
    { no: 56, slug: "kfc-christmas", cat: "culture", q: "ケンタッキーは、なぜクリスマスに食べる？", tags: ["食べ物", "日本"], related: ["conveyor-sushi"] },
    { no: 58, slug: "conveyor-sushi", cat: "culture", q: "回転寿司は、だれが思いついた？", tags: ["食べ物", "日本"], related: ["kfc-christmas", "ramen"] },
    { no: 59, slug: "blue-signal", cat: "culture", q: "緑色なのに、なぜ「青信号」？", tags: ["日本", "言葉"], related: ["color-vision"] },
    { no: 61, slug: "kaonashi", cat: "ent", q: "『千と千尋の神隠し』のカオナシは、何を表している？", tags: ["アニメ", "ジブリ", "映画"], related: ["goku-tail", "shingeki-walls", "pokemon-origin"], status: "published", date: "2026-10-31",
      cover: { src: "images/kaonashi/cover.jpg", small: "images/kaonashi/cover_s.jpg", title: "Japanese communal bathhouse SENTO（子宝湯の男湯）", artist: "ウィキ太郎(WikiTaro)", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Japanese_communal_bathhouse_SENTO_Sent%C5%8D_%E9%8A%AD%E6%B9%AF%E3%81%AE%E6%B5%B4%E5%AE%A4.jpg" } },
    { no: 65, slug: "goku-tail", cat: "ent", q: "孫悟空は、なぜ途中でしっぽがなくなった？", tags: ["マンガ", "アニメ"], related: [] },
    { no: 66, slug: "pokemon-origin", cat: "ent", q: "ポケモンは、どんな遊びから生まれた？", tags: ["ゲーム", "アニメ"], related: ["goku-tail"] },
    { no: 68, slug: "shingeki-walls", cat: "ent", q: "『進撃の巨人』の壁は、何を表している？", tags: ["マンガ", "アニメ"], related: ["goku-tail"] },

    /* 2026-10-29 本人の持ちこみ題材 */
    { no: 71, slug: "sukiya-yoshinoya", cat: "society", q: "すき家は、吉野家から生まれた？", tags: ["食べ物", "お店", "会社"], related: ["conveyor-sushi"], status: "published", date: "2026-10-29",
      cover: { src: "images/sukiya-yoshinoya/cover.jpg", small: "images/sukiya-yoshinoya/cover_s.jpg", title: "Sukiya Restaurant, Kyoto", artist: "HAGAT hOMSZE", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:JP_%E6%97%A5%E6%9C%AC_Japan_%E4%BA%AC%E9%83%BD_Kyoto_tourism_Sukiya_Restaurant_1953pm_night_June_2026_N13P_09.jpg" } },
    { no: 72, slug: "misdo-america", cat: "society", q: "ミスタードーナツは、アメリカに1店しか残っていない？", tags: ["食べ物", "お店", "会社"], related: ["starbucks-australia", "sukiya-yoshinoya"], status: "published", date: "2026-10-31",
      cover: { src: "images/misdo-america/cover.jpg", small: "images/misdo-america/cover_s.jpg", title: "Mister Donut Store, Naha", artist: "Naha Mama Pavilionz", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:JP_%E6%97%A5%E6%9C%AC_Japan_%E6%B2%96%E7%B9%A9_OKINAWA_%E9%82%A3%E9%9C%B8_Naha_city_walk_shop_Mister_Donut_Store_1557pm_January_2025_R12S.jpg" } },
    { no: 73, slug: "red-bull-origin", cat: "society", q: "レッドブルは、タイの栄養ドリンクから生まれた？", tags: ["飲み物", "会社"], related: ["starbucks-australia", "misdo-america"] },
    { no: 74, slug: "starbucks-australia", cat: "society", q: "スタバは、なぜオーストラリアでは失敗した？", tags: ["飲み物", "お店", "会社"], related: ["coffee", "misdo-america"] },
    { no: 75, slug: "pachinko-exchange", cat: "society", q: "パチンコの景品交換所は、なぜいつも店のすぐ隣にある？", tags: ["お金", "お店"], related: ["donki-narrow"] },
    { no: 76, slug: "indian-curry-shops", cat: "society", q: "インドカレー屋は、なぜガラガラでもつぶれない？", tags: ["食べ物", "お店"], related: ["sukiya-yoshinoya", "donki-narrow"] },
    { no: 77, slug: "donki-narrow", cat: "society", q: "ドン・キホーテの店内は、なぜあんなに狭い？", tags: ["お店", "脳"], related: ["indian-curry-shops"] },
    { no: 78, slug: "elon-musk", cat: "tech", q: "イーロン・マスクって、何者？", tags: ["人物", "宇宙", "AI"], related: ["amazon-next-day"] },
    { no: 79, slug: "amazon-next-day", cat: "tech", q: "Amazon は、なぜ注文した翌日に届く？", tags: ["物流", "会社"], related: ["global-shipping", "elon-musk"] },
    { no: 80, slug: "gta5", cat: "ent", q: "GTA5 は、なぜ10年以上も売れ続けている？", tags: ["ゲーム"], related: ["pokemon-origin"] },
    { no: 81, slug: "israel-palestine", cat: "history", q: "イスラエルとパレスチナは、なぜずっと争っている？", tags: ["世界", "地図", "ニュース"], related: ["russia-ukraine", "india-caste"] },
    { no: 82, slug: "russia-ukraine", cat: "history", q: "ロシアとウクライナは、なぜ戦争になった？", tags: ["世界", "地図", "ニュース"], related: ["israel-palestine"] },
    { no: 83, slug: "india-caste", cat: "history", q: "インドでは、いまも生まれで結婚相手が決まる？", tags: ["世界", "人間関係"], related: ["israel-palestine", "indian-curry-shops"] },
    { no: 84, slug: "mcdonalds-fries", cat: "society", q: "マクドナルドのポテトは、なぜあんなにおいしい？", tags: ["食べ物", "お店", "会社"], related: ["sukiya-yoshinoya", "misdo-america"] },
    { no: 85, slug: "simulation-hypothesis", cat: "mind", q: "この世界がゲームの中ではないと、言い切れる？", tags: ["脳", "宇宙", "ゲーム"], related: ["elon-musk"] }
  ].map(function (t) { t.status = t.status || "soon"; t.minutes = t.minutes || 5; t.tags = t.tags || []; return t; })
};
