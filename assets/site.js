/* SOMOSOMO（そもそも） — 共通のヘッダー・メニュー・下のタブと、目録（data/*.js）から各ページを組み立てる */
(function () {
  "use strict";
  var Z = window.ZUKAN;
  var F = window.ZUKAN_FEATURES || [];
  var P = window.ZUKAN_PHOTOS || {};
  var page = document.body.getAttribute("data-page");
  var ROOT = document.body.getAttribute("data-root") || "";   /* articles/ の中のページは "../" */
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 今日の写真（日本時間の日付で、毎日自動で入れ替わる） ---------- */
  var DAY = Math.floor((Date.now() + 9 * 3600 * 1000) / 86400000);
  function mod(a, n) { return ((a % n) + n) % n; }
  function photo(catId, offset) {
    var a = P[catId] || [];
    return a.length ? a[mod(DAY + (offset || 0), a.length)] : null;
  }
  function licenseJa(l) { return /cc0/i.test(l) ? "CC0" : "パブリックドメイン"; }
  function credit(p) {
    if (!p) return "";
    return '<a class="photo-credit" href="' + esc(p.page) + '" target="_blank" rel="noopener">写真：' + esc(p.title) + "／" + esc(p.artist) + "（" + licenseJa(p.license) + "）</a>";
  }
  function todayLabel() {
    var d = new Date(DAY * 86400000);
    return d.getUTCFullYear() + "." + pad(d.getUTCMonth() + 1) + "." + pad(d.getUTCDate());
  }

  /* ---------- 小道具 ---------- */
  /* 題を読点のあとで区切る（文節の途中で折り返さないように。「、」までをひとかたまりにする） */
  function qh(q) { return esc(q).split(/(?<=、)/).map(function (x) { return '<span class="qw">' + x + "</span>"; }).join(""); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function cat(id) { return Z.categories.filter(function (c) { return c.id === id; })[0]; }
  function topic(slug) { return Z.topics.filter(function (t) { return t.slug === slug; })[0]; }
  function topicsOf(id) { return Z.topics.filter(function (t) { return t.cat === id; }); }
  function feature(id) { return F.filter(function (f) { return f.id === id; })[0]; }
  function featuresWith(slug) { return F.filter(function (f) { return f.articles.indexOf(slug) >= 0; }); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function u(path) { return ROOT + path; }
  function articleUrl(t) { return u(t.status === "published" ? "articles/" + t.slug + ".html" : "article.html#" + t.slug); }
  function catUrl(id) { return u("category.html#" + id); }
  function featureUrl(id) { return u("feature.html#" + id); }
  function img(src, cls, eager) {
    return '<img class="' + (cls || "") + '" src="' + esc(u(src)) + '" alt=""' + (eager ? "" : ' loading="lazy"') + ' decoding="async">';
  }
  function topicPhoto(t) { return t.cover || (t.status === "published" ? photo(t.cat, t.no) : null); }  /* 準備中の記事は写真なし（中身と合わない写真を出さない） */  /* 公開済みの記事は自分の写真を使う */
  function featurePhoto(f) { return photo(f.cover, parseInt(f.no, 10) * 3); }
  function readLabel(t) { return t.status === "published" ? "約" + t.minutes + "分で読める" : '<span class="soon">準備中</span>'; }

  var I = {
    home: '<path d="M4 11L12 4L20 11V20H14.5V14.5H9.5V20H4Z"/>',
    cat: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    feature: '<path d="M6 3H18V21L12 17L6 21Z"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L20.5 20.5"/>',
    menu: '<path d="M4 8H20M4 16H14"/>',
    close: '<path d="M6 6L18 18M18 6L6 18"/>',
    arrow: '<path d="M5 12H19M13 6L19 12L13 18"/>',
    chevron: '<path d="M9 5L16 12L9 19"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8V12L15 14"/>'
  };
  function svg(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[name] + "</svg>";
  }
  /* セクション見出し：通し番号（イタリック）＋英字の小見出し＋明朝 */
  var secNo = 0;
  function secHead(en, title, moreHref, moreText, sm) {
    secNo += 1;
    return '<div class="sec-head' + (sm ? " sm" : en.length > 10 ? " long" : "") + '"><span class="sec-no">' + pad(secNo) + '</span><div class="sec-title"><span class="en">' + en + "</span><h2>" + title + "</h2></div>" +
      (moreHref ? '<a class="more" href="' + moreHref + '">' + (moreText || "すべて見る") + svg("arrow") + "</a>" : "") + "</div>";
  }

  /* ---------- 部品 ---------- */
  function fmtDate(d) { return d ? d.replace(/-/g, ".") : ""; }
  function isNew(t) { return t.status === "published" && t.date && DAY - Math.floor(Date.parse(t.date + "T00:00:00+09:00") / 86400000 + 9 / 24) <= 7; }
  function newBadge(t) { return isNew(t) ? '<span class="new-badge" aria-label="新着">NEW!</span>' : ""; }
  /* サブタイトル（世界史の流れなど、連載の記事だけ。例：中世 ― 7〜8世紀・アラビア半島） */
  function subLine(t, cls) { return t.sub ? '<span class="' + (cls || "sub") + '">' + esc(t.sub) + "</span>" : ""; }
  function epLabel(t) { return t.series ? "第" + t.ep + "話" : ""; }
  function row(t, big, hl) {
    var c = cat(t.cat), p = topicPhoto(t);
    return '<a class="row" href="' + articleUrl(t) + '"><div class="thumb">' + (p ? img(big === true ? p.src : p.small) : "") + newBadge(t) + "</div>" +
      '<div class="txt"><span class="row-top"><span class="cat-label">' + esc(c.name) + (t.series ? " ・ " + epLabel(t) : "") + '</span></span><h3><span class="hl">' + qh(t.q) + "</span></h3>" + (hl === true ? hlA(t) : "") + subLine(t) + '<span class="meta">' + readLabel(t) +
      (t.date ? '<span class="sep"></span><span class="date">' + fmtDate(t.date) + " UP</span>" : "") + "</span></div></a>";
  }
  function fcard(f) {
    var p = featurePhoto(f);
    return '<a class="fcard" href="' + featureUrl(f.id) + '">' + (p ? img(p.small, "bg") : "") + '<span class="shade"></span>' +
      '<span class="fcard-no">' + f.no + "</span>" + '<span class="vlabel" aria-hidden="true">' + f.en + "</span>" +
      '<span class="fcard-in"><span class="en">Special ・ ' + f.en + "</span><h3>" + esc(f.title) + "</h3><small>全" + f.articles.length + (f.parts ? "話" : "記事") + "を読む</small></span></a>";
  }
  function catRow(c, big) {
    var p = photo(c.id, 5);
    return '<a class="cat-row' + (big ? " big" : "") + '" href="' + catUrl(c.id) + '"><div class="thumb">' + (p ? img(big ? p.src : p.small, "", big) : "") + '<span class="cat-no">' + c.no + "</span></div>" +
      '<div class="txt"><span class="en">' + c.en + "</span><h3>" + esc(c.name) + "</h3><p>" + esc(c.desc) + "</p>" +
      '<span class="more">記事を見る（' + topicsOf(c.id).length + "）" + svg("arrow") + "</span></div></a>";
  }
  function ticker() {
    var words = Z.keywords.concat(Z.categories.map(function (c) { return c.name; }));
    var one = words.map(function (w) { return '<span>' + esc(w) + '</span><i>Why?</i>'; }).join("");
    return '<div class="ticker" aria-hidden="true"><div class="ticker-track">' + one + one + "</div></div>";
  }

  /* ---------- 共通：ヘッダー・メニュー・下のタブ・フッター ---------- */
  var SECTION = { home: "home", categories: "cat", category: "cat", features: "feature", feature: "feature", search: "search" }[page] || "";

  function renderChrome() {
    var head = document.getElementById("site-header");
    head.className = "site-header";
    head.innerHTML = '<div class="wrap"><a class="logo" href="' + u("index.html") + '"><b>SOMO<i>SOMO</i></b><small>そもそも、なぜ？</small></a>' +
      '<nav class="desk-nav" aria-label="メイン">' +
      '<a href="' + u("index.html") + '"' + (SECTION === "home" ? ' aria-current="page"' : "") + ">ホーム</a>" +
      '<a href="' + u("categories.html") + '"' + (SECTION === "cat" ? ' aria-current="page"' : "") + ">カテゴリ</a>" +
      '<a href="' + u("features.html") + '"' + (SECTION === "feature" ? ' aria-current="page"' : "") + ">特集</a>" +
      '<a href="' + u("search.html") + '"' + (SECTION === "search" ? ' aria-current="page"' : "") + ">検索</a></nav>" +
      '<button class="icon-btn" id="menu-open" type="button" aria-label="メニューを開く" aria-controls="menu" aria-expanded="false">' + svg("menu") + "</button></div>";
    /* ヘッダー下のカテゴリの帯は 2026-11-19 にやめた（本人「上のカテゴリのバーいらないのでは？」） */
    markStrip();
    window.addEventListener("hashchange", markStrip);

    /* スクロールで下に進むとヘッダーを隠し、戻ると出す */
    var lastY = window.scrollY;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      head.classList.toggle("is-hidden", y > lastY && y > 120);
      head.classList.toggle("is-scrolled", y > 8);
      lastY = y;
    }, { passive: true });

    var menu = document.createElement("div");
    menu.className = "menu"; menu.id = "menu"; menu.hidden = true;
    menu.setAttribute("role", "dialog"); menu.setAttribute("aria-label", "メニュー");
    var n = 0;
    function st() { n += 1; return ' style="--i:' + n + '"'; }
    menu.innerHTML = '<div class="wrap"><div class="menu-top"><a class="logo" href="' + u("index.html") + '"><b>SOMO<i>SOMO</i></b><small>そもそも、なぜ？</small></a>' +
      '<button class="icon-btn" id="menu-close" type="button" aria-label="メニューを閉じる">' + svg("close") + "</button></div>" +
      '<a class="item"' + st() + ' href="' + u("index.html") + '"><span class="item-no">01</span>ホーム<span class="item-en">Home</span></a>' +
      '<a class="item"' + st() + ' href="' + u("categories.html") + '"><span class="item-no">02</span>カテゴリ<span class="item-en">Category</span></a>' +
      '<div class="sub"' + st() + ">" + Z.categories.map(function (c) { return '<a href="' + catUrl(c.id) + '">' + esc(c.name) + "</a>"; }).join("") + "</div>" +
      '<a class="item"' + st() + ' href="' + u("features.html") + '"><span class="item-no">03</span>特集<span class="item-en">Special</span></a>' +
      '<div class="sub"' + st() + ">" + F.map(function (f) { return '<a href="' + featureUrl(f.id) + '">' + esc(f.title) + "</a>"; }).join("") + "</div>" +
      '<a class="item"' + st() + ' href="' + u("search.html") + '"><span class="item-no">04</span>検索<span class="item-en">Search</span></a>' +
      "<h3" + st() + '>人気のキーワード</h3><div class="chips"' + st() + ">" + Z.keywords.map(function (k, i) { return '<a href="' + u("search.html#k" + i) + '">' + esc(k) + "</a>"; }).join("") + "</div>" +
      '<p class="menu-foot"' + st() + '><a href="' + u("credits.html") + '">写真クレジット</a></p></div>';
    document.body.appendChild(menu);
    var openBtn = document.getElementById("menu-open");
    function setMenu(open) {
      if (open) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add("is-open"); }); }
      else { menu.classList.remove("is-open"); setTimeout(function () { menu.hidden = true; }, REDUCED ? 0 : 280); }
      openBtn.setAttribute("aria-expanded", String(open));
      document.documentElement.style.overflow = open ? "hidden" : "";
      if (open) document.getElementById("menu-close").focus(); else openBtn.focus();
    }
    openBtn.addEventListener("click", function () { setMenu(true); });
    document.getElementById("menu-close").addEventListener("click", function () { setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) { menu.hidden = true; menu.classList.remove("is-open"); document.documentElement.style.overflow = ""; } });

    var tab = document.createElement("nav");
    tab.className = "tabbar"; tab.setAttribute("aria-label", "メイン");
    var tabs = [["home", "index.html", "ホーム"], ["cat", "categories.html", "カテゴリ"], ["feature", "features.html", "特集"], ["search", "search.html", "検索"]];
    tab.innerHTML = "<ul>" + tabs.map(function (t) {
      return '<li><a href="' + u(t[1]) + '"' + (SECTION === t[0] ? ' aria-current="page"' : "") + ">" + svg(t[0]) + t[2] + "</a></li>";
    }).join("") + "</ul>";
    document.body.appendChild(tab);

    var top = document.createElement("button");
    top.type = "button"; top.className = "to-top"; top.setAttribute("aria-label", "ページの先頭へ");
    top.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11L12 5L18 11"/></svg><span>TOP</span>';
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }); });
    document.body.appendChild(top);
    window.addEventListener("scroll", function () { top.classList.toggle("is-shown", window.scrollY > 900); }, { passive: true });

    var foot = document.getElementById("site-footer");
    foot.className = "site-footer";
    foot.innerHTML = '<div class="wrap"><a class="foot-logo" href="' + u("index.html") + '"><b>SOMOSOMO</b><small>そもそも、なぜ？<br>身の回りの「なぜ？」が、5分でわかる。</small></a>' +
      '<nav class="foot-cats" aria-label="カテゴリ">' + Z.categories.map(function (c) { return '<a href="' + catUrl(c.id) + '"><span>' + c.no + "</span>" + esc(c.name) + svg("arrow") + "</a>"; }).join("") + "</nav>" +
      '<nav class="foot-links" aria-label="フッター"><a href="' + u("features.html") + '">特集</a><a href="' + u("search.html") + '">検索</a><a href="' + u("credits.html") + '">写真クレジット</a></nav>' +
      "<small class=\"foot-note\">写真は毎日入れ替わります。　© 2026 SOMOSOMO編集部</small></div>";
  }

  var main = document.getElementById("main");

  /* ---------- ホーム ---------- */
  /* 表紙（Cover Story）：毎日入れ替わる5本。7日以内に公開した記事があれば先頭に1本、残りは公開済みの全記事から日付で選ぶ */
  function coverStories() {
    function h(str) { var x = 0; for (var i = 0; i < str.length; i++) x = (x * 31 + str.charCodeAt(i)) | 0; return x; }
    var all = pubs(function (t) { return !!t.cover; });
    var out = all.filter(isNew).slice(0, 1);
    var rest = all.filter(function (t) { return out.indexOf(t) < 0; })
      .sort(function (a, b) { return h(a.slug + DAY) - h(b.slug + DAY); });
    return out.concat(rest).slice(0, 5);
  }
  function renderHome() {
    var stories = coverStories(), picks = Z.picks.map(topic).filter(function (t) { return stories.indexOf(t) < 0; });
    var start = 0;
    var slides = stories.map(function (t, i) {
      var c = cat(t.cat), p = t.cover || photo(t.cat, i * 2);
      return '<a class="slide' + (i === start ? " is-active" : "") + '" href="' + articleUrl(t) + '" data-credit="' + esc(p ? credit(p) : "") + '"' + (i === start ? "" : ' tabindex="-1" aria-hidden="true"') + ">" +
        (p ? img(p.src, "bg", i === start) : "") + '<span class="shade"></span>' +
        '<span class="cover-in"><span class="en">Cover Story ・ ' + todayLabel() + "</span>" +
        '<h1><span class="band">' + qh(t.q) + "</span></h1>" +
        '<span class="meta"><span>' + esc(c.name) + '</span><span class="sep"></span>' + readLabel(t) + "</span></span>" +
        newBadge(t) + '<span class="go">' + svg("arrow") + "</span></a>";
    }).join("");
    var dots = stories.map(function (t, i) {
      return '<button type="button" class="bar" data-i="' + i + '" aria-label="' + (i + 1) + '枚目を表示"' + (i === start ? ' aria-current="true"' : "") + "><i></i></button>";
    }).join("");

    main.innerHTML =
      '<div class="running-head"><span>そもそも、なぜ？</span><span>' + todayLabel() + "</span><span>" + pubs().length + " STORIES</span></div>" +
      '<div class="home-top"><div class="home-cover">' +
      '<div class="cover carousel" id="carousel">' + slides +
      '<div class="cover-ui"><button type="button" class="nav-btn" data-step="-1" aria-label="前の記事">' + svg("arrow", "flip") + "</button>" +
      '<span class="count"><b id="c-now">' + pad(start + 1) + "</b> / " + pad(stories.length) + '</span><div class="bars">' + dots + "</div>" +
      '<button type="button" class="nav-btn" data-step="1" aria-label="次の記事">' + svg("arrow") + "</button></div>" +
      spinBadge() +
      '<p class="tate" aria-hidden="true">なぜ？を、五分で。</p></div>' +
      '<div id="c-credit">' + credit(stories[start].cover || photo(stories[start].cat, start * 2)) + "</div></div>" +
      '<p class="home-intro">身の回りの「なぜ？」を、写真と図解で<b>5分</b>で読めるウェブマガジン。</p>' +
      (picks.length ? '<section class="sec home-picks">' + secHead("First Issue", "創刊ラインナップ", null, null, true) + '<div class="rows two">' + picks.map(row).join("") + "</div></section>" : "") + "</div>" +
      '<section class="statement" aria-label="SOMOSOMOについて"><p class="statement-lead">そもそも、<br>なぜだろう？</p>' +
      '<p class="statement-tate">身の回りの当たり前には、たいてい驚くような理由があります。写真と図解で、その理由をのぞいてみませんか。</p></section>' +
      ticker() +
      '<section class="sec dark-band zig">' + secHead("Special", "特集", u("features.html")) + '<div class="feature-rail">' + F.map(fcard).join("") + "</div></section>" +
      Z.categories.map(function (c, k) { return genreSec(c, k) + (c.id === "history" ? seriesSec() : "") + (c.id === "nature" ? quoteBand() : ""); }).join("") +
      '<section class="tag-band" aria-labelledby="h-kw"><span class="en">Pick up keywords</span><h2 id="h-kw">#気になることばから探す</h2>' +
      '<div class="hash">' + Z.keywords.map(function (k, i) { return '<a href="' + u("search.html#k" + i) + '">#' + esc(k) + "</a>"; }).join("") + "</div></section>" + feedHtml(true);
    startCarousel(start);
    startFeed("");
    startFeedTabs();
    startAutoRails();
  }


  /* ---------- 終わりの見えない誌面（2026-11-19）：どのページも、下に記事が数珠つなぎに続く ---------- */
  function byNew(a, b) { return (b.date || "").localeCompare(a.date || "") || a.no - b.no; }
  function pubs(fn) { return Z.topics.filter(function (t) { return t.status === "published" && (!fn || fn(t)); }).sort(byNew); }
  function mosaic(list, hl) { return '<div class="rows two mosaic">' + list.map(function (t, i) { return row(t, i % 5 === 0, hl === true); }).join("") + "</div>"; }
  /* ---------- 並べ方のいろいろ（BRUTUS のトップのように、欄ごとに変える） ---------- */
  var HL = window.ZUKAN_HL || {}, COL = window.ZUKAN_COLUMNS || {};
  /* 問いの答え（ひとことで言うと）は記事の外に出さない（2026-11-19、本人「読む一番の動機がなくなる」）。呼び出しは残し、何も出さない */
  function hlA() { return ""; }
  /* 縦の番号つき一覧 */
  function vlist(list, hl, from) {
    return '<ol class="vlist">' + list.map(function (t, i) {
      var p = topicPhoto(t), c = cat(t.cat);
      return '<li><a href="' + articleUrl(t) + '"><span class="vl-no">' + pad((from || 0) + i + 1) + '</span><span class="vl-txt"><span class="cat-label">' + esc(t.series ? epLabel(t) + " ・ " + (t.sub || "") : c.name) + "</span><b>" + qh(t.q) + "</b>" +
        (hl === true ? hlA(t) : "") + '<span class="meta">' + readLabel(t) + '</span></span><span class="vl-thumb">' + (p ? img(p.small) : "") + "</span></a></li>";
    }).join("") + "</ol>";
  }
  /* 横に自動で流れる棚 */
  function arail(list) {
    return '<div class="arail" data-auto>' + list.map(function (t) {
      var p = topicPhoto(t), c = cat(t.cat);
      return '<a class="rcard" href="' + articleUrl(t) + '">' + (p ? img(p.small, "bg") : "") + '<span class="shade"></span>' + newBadge(t) +
        '<span class="rc-in"><span class="cat-label">' + esc(t.series ? epLabel(t) : c.name) + "</span><b>" + qh(t.q) + "</b></span></a>";
    }).join("") + "</div>";
  }
  /* 大きさがまばらな並び */
  function scatter(list) {
    return '<div class="scatter">' + list.map(function (t, i) {
      var p = topicPhoto(t), c = cat(t.cat);
      return '<a class="sc" href="' + articleUrl(t) + '"><span class="thumb">' + (p ? img(i === 2 ? p.src : p.small) : "") + newBadge(t) + '</span><span class="cat-label">' + esc(c.name) + "</span><b>" + qh(t.q) + '</b><span class="meta">' + readLabel(t) + "</span></a>";
    }).join("") + "</div>";
  }
  /* 大きな1本＋文字だけの一覧 */
  function heroList(list) {
    var t = list[0], p = topicPhoto(t), c = cat(t.cat);
    return '<a class="hero-card" href="' + articleUrl(t) + '">' + (p ? img(p.src, "bg") : "") + '<span class="shade"></span>' + newBadge(t) +
      '<span class="hc-in"><span class="cat-label">' + esc(c.name) + '</span><h3><span class="band">' + qh(t.q) + '</span></h3><span class="meta">' + readLabel(t) + "</span></span></a>" +
      '<ol class="tlist">' + list.slice(1).map(function (x) {
        return '<li><a href="' + articleUrl(x) + '"><b>' + qh(x.q) + "</b>" + svg("arrow") + "</a></li>";
      }).join("") + "</ol>";
  }
  /* 全面の写真1枚に「ここが面白い！」を重ねる見開き＋文字だけの一覧 */
  function spread(list) {
    var t = list[0], p = topicPhoto(t), f = HL[t.slug] && HL[t.slug].f;
    return '<a class="spread" href="' + articleUrl(t) + '">' + (p ? img(p.src, "bg") : "") + '<span class="shade"></span>' +
      '<span class="sp-in">' + (f ? '<span class="sp-quote">' + esc(f) + "</span>" : "") + '<span class="sp-q">' + qh(t.q) + svg("arrow") + "</span></span></a>" +
      '<ol class="tlist">' + list.slice(1).map(function (x) { return '<li><a href="' + articleUrl(x) + '"><b>' + qh(x.q) + "</b>" + svg("arrow") + "</a></li>"; }).join("") + "</ol>";
  }
  /* 写真なし、文字だけの目録（問いと、ひとことの答え） */
  function catalog(list) {
    return '<ol class="catalog">' + list.map(function (t, i) {
      return '<li><a href="' + articleUrl(t) + '"><span class="ct-no">' + pad(i + 1) + "</span><b>" + qh(t.q) + '</b><span class="meta">' + readLabel(t) + "</span></a></li>";
    }).join("") + "</ol>";
  }
  /* 欄と欄のあいだの、大きな引用1行 */
  function quoteBand() {
    var cand = pubs(function (t) { return HL[t.slug] && HL[t.slug].f && t.cat === "nature"; });
    if (!cand.length) return "";
    var t = cand[mod(DAY, cand.length)];
    return '<a class="quote-band" href="' + articleUrl(t) + '"><span class="qb-src qb-top">' + qh(t.q) + '</span><span class="qb-mark" aria-hidden="true">\u201C</span><span class="qb-text">' + esc(HL[t.slug].f) + '</span><span class="qb-src">記事を読む' + svg("arrow") + "</span></a>";
  }
  function startAutoRails() {
    document.querySelectorAll(".arail[data-auto]").forEach(function (r) {
      if (REDUCED) return;
      var hold = 0, seen = false;
      function pause() { hold = Date.now() + 7000; }
      ["pointerdown", "touchstart", "wheel", "focusin"].forEach(function (ev) { r.addEventListener(ev, pause, { passive: true }); });
      if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { seen = es[0].isIntersecting; }).observe(r);
      setInterval(function () {
        if (!seen || Date.now() < hold || document.hidden) return;
        var card = r.firstElementChild; if (!card) return;
        var step = card.getBoundingClientRect().width + 12, max = r.scrollWidth - r.clientWidth - 4;
        r.scrollTo({ left: r.scrollLeft >= max ? 0 : r.scrollLeft + step, behavior: "smooth" });
      }, 3600);
    });
  }
  /* ホームのジャンルの欄（BRUTUS のトップの FASHION・WATCHES のように、ジャンルごとに積む） */
  function genreSec(c, k) {
    var all = pubs(function (t) { return t.cat === c.id && !t.series; });
    if (!all.length) return "";
    var L = { nature: "mosaic", history: "vlist", society: "scatter", mind: "rail", tech: "hero", culture: "spread", ent: "catalog" }[c.id] || "mosaic";
    var big = { nature: 1, society: 1, culture: 1 }[c.id];
    var body = L === "vlist" ? vlist(all.slice(0, 5)) : L === "scatter" ? scatter(all.slice(0, 5)) : L === "rail" ? arail(all.slice(0, 8)) : L === "hero" ? heroList(all.slice(0, 5)) :
      L === "spread" ? spread(all.slice(0, 4)) : L === "catalog" ? catalog(all.slice(0, 5)) : mosaic(all.slice(0, 5));
    return '<section class="sec genre g-' + L + (k % 2 ? " dark-band" : big ? " notch" : "") + '" id="g-' + c.id + '">' + secHead(c.en, c.name, null, null, !big) +
      body + '<a class="genre-more" href="' + catUrl(c.id) + '">' + esc(c.name) + "の疑問をすべて見る" + svg("arrow") + "</a></section>";
  }
  function seriesSec() {
    var f = feature("world-history");
    if (!f) return "";
    var eps = pubs(function (t) { return t.series === "world-history"; }).sort(function (a, b) { return b.ep - a.ep; });
    return '<section class="sec genre" id="g-world-history">' + secHead("World History", "世界史の流れ　新しい話から", null, null, true) +
      arail(eps.slice(0, 8)) + '<a class="genre-more" href="' + featureUrl(f.id) + '">36話の目次を見る' + svg("arrow") + "</a></section>";
  }
  /* 数珠つなぎの欄：10本ずつ読み足し、あいだに特集・カテゴリの大きな帯をはさむ */
  /* ジャンルを順に1本ずつ混ぜる（同じジャンルが続かないように） */
  function mix(list) {
    var by = {}, order = [], out = [];
    list.forEach(function (t) { var g = t.series ? "series" : t.cat; if (!by[g]) { by[g] = []; order.push(g); } by[g].push(t); });
    while (out.length < list.length) order.forEach(function (g) { if (by[g].length) out.push(by[g].shift()); });
    return out;
  }
  function feedBreak(k) {
    var shownF = {};
    document.querySelectorAll('a[href*="feature.html#"]').forEach(function (a) { shownF[a.getAttribute("href").split("#")[1]] = 1; });
    var freeF = F.filter(function (f) { return !shownF[f.id]; });
    if (k % 2 === 0 && freeF.length) { var f = freeF[(k / 2) % freeF.length]; return '<div class="feed-break dark-band">' + fcard(f) + "</div>"; }
    var nb = document.querySelectorAll("#feed-box .cat-band").length;
    var c = Z.categories[nb % Z.categories.length], p = photo(c.id, k + 3);
    return '<a class="cat-band" href="' + catUrl(c.id) + '">' + (p ? img(p.src, "bg") : "") + '<span class="shade"></span><span class="cb-in"><span class="cb-no">' + c.no + '</span><span class="cb-en">' + c.en + "</span><b>" + esc(c.name) + "</b><small>" + esc(c.desc) + '</small><span class="more">この分野の疑問を見る' + svg("arrow") + "</span></span></a>";
  }
  function feedHtml(tabs) {
    return '<section class="sec feed" id="feed">' + secHead("More Stories", "まだまだある、そもそも") +
      (tabs ? '<div class="tabs" role="tablist" aria-label="カテゴリで絞り込む"><button type="button" role="tab" aria-selected="true" data-tab="">すべて</button>' +
        Z.categories.map(function (c) { return '<button type="button" role="tab" aria-selected="false" data-tab="' + c.id + '">' + esc(c.name) + "</button>"; }).join("") + "</div>" : "") +
      '<div id="feed-box"></div><div id="feed-end" class="feed-end" aria-live="polite"><span class="feed-dots" aria-hidden="true"><i></i><i></i><i></i></span></div></section>';
  }
  function shownSlugs() {
    var s = {}; s[document.body.getAttribute("data-slug") || ""] = 1;
    document.querySelectorAll("main a[href], #story-more a[href]").forEach(function (a) {
      var m = a.getAttribute("href").match(/articles\/([^\/#?]+)\.html/); if (m) s[m[1]] = 1;
    });
    return s;
  }
  var feedObs = null;
  function startFeed(cat) {
    var box = document.getElementById("feed-box"), end = document.getElementById("feed-end");
    if (!box) return;
    if (/[?&]nofeed/.test(location.search)) { box.innerHTML = "<p>（撮影用：数珠つなぎの欄を止めています）</p>"; return; }  /* 撮影ツールでホームの中ほどを撮るため */
    var ex = cat ? {} : shownSlugs();
    var list = mix(pubs(function (t) { return cat ? t.cat === cat : !ex[t.slug]; }));
    if (!cat && list.length < 12) list = pubs(function (t) { return t.slug !== document.body.getAttribute("data-slug"); });
    var i = 0, k = 0;
    box.innerHTML = ""; end.classList.remove("is-done"); end.innerHTML = '<span class="feed-dots" aria-hidden="true"><i></i><i></i><i></i></span>';
    if (feedObs) feedObs.disconnect();
    document.body.classList.add("feed-on");
    function near() { return end.getBoundingClientRect().top < window.innerHeight + 1400; }
    function more() {
      if (i >= list.length) return;
      var chunk = list.slice(i, i + 10); i += chunk.length;
      box.insertAdjacentHTML("beforeend", mosaic(chunk) + (i < list.length ? feedBreak(k++) : ""));
      fadeImages();
      if (i >= list.length) {
        if (feedObs) feedObs.disconnect();
        document.body.classList.remove("feed-on");
        end.classList.add("is-done");
        end.innerHTML = "<p>" + "公開中の "+ Z.topics.filter(function (t) { return t.status === "published"; }).length + " 本を、ここまで。次の「そもそも」をお楽しみに。</p>";
      } else if (near()) requestAnimationFrame(more);
    }
    if ("IntersectionObserver" in window) {
      feedObs = new IntersectionObserver(function (es) { if (es[0].isIntersecting) more(); }, { rootMargin: "0px 0px 1400px 0px" });
      more(); feedObs.observe(end);
    } else { while (i < list.length) more(); }
  }
  function startFeedTabs() {
    var tabs = document.querySelectorAll("#feed .tabs [data-tab]");
    tabs.forEach(function (b) {
      b.addEventListener("click", function () {
        tabs.forEach(function (x) { x.setAttribute("aria-selected", String(x === b)); });
        startFeed(b.getAttribute("data-tab"));
      });
    });
  }

  /* 回り続ける円形の文字バッジ */
  function spinBadge() {
    return '<span class="spin-badge" aria-hidden="true"><svg viewBox="0 0 100 100"><defs><path id="spin-path" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1 -76 0"/></defs>' +
      '<text><textPath href="#spin-path" textLength="236" lengthAdjust="spacing">SOMOSOMO ・ WHY? ・ 5 MINUTES ・</textPath></text></svg><b>?</b></span>';
  }

  /* ヘッダー下のカテゴリの帯：いまのカテゴリに印を付ける */
  function markStrip() {
    var id = "";
    if (page === "category") id = location.hash.slice(1) || Z.categories[0].id;
    if (page === "story" || page === "article") id = (topic(document.body.getAttribute("data-slug") || location.hash.slice(1)) || {}).cat || "";
    document.querySelectorAll(".cat-strip [data-cat]").forEach(function (a) {
      if (a.getAttribute("data-cat") === id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  /* 表紙のスライド：6秒ごとに次の記事へ。動きを減らす設定なら自動では送らない */
  function startCarousel(start) {
    var box = document.getElementById("carousel");
    if (!box) return;
    var slides = box.querySelectorAll(".slide"), bars = box.querySelectorAll(".bar");
    var now = start, timer = null, INTERVAL = 6000;
    function show(i) {
      now = mod(i, slides.length);
      slides.forEach(function (s, k) {
        var on = k === now;
        s.classList.toggle("is-active", on);
        if (on) { s.removeAttribute("tabindex"); s.removeAttribute("aria-hidden"); var im = s.querySelector("img"); if (im) im.loading = "eager"; }
        else { s.setAttribute("tabindex", "-1"); s.setAttribute("aria-hidden", "true"); }
      });
      bars.forEach(function (b, k) { if (k === now) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
      document.getElementById("c-now").textContent = pad(now + 1);
      document.getElementById("c-credit").innerHTML = slides[now].getAttribute("data-credit");
      box.classList.remove("tick"); void box.offsetWidth; box.classList.add("tick");
    }
    function play() { if (REDUCED) return; clearInterval(timer); timer = setInterval(function () { show(now + 1); }, INTERVAL); }
    bars.forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); show(+b.getAttribute("data-i")); play(); }); });
    box.querySelectorAll(".nav-btn").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); show(now + +b.getAttribute("data-step")); play(); }); });
    /* 指で左右にスワイプして切り替え */
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { show(now + (dx < 0 ? 1 : -1)); play(); }
    });
    document.addEventListener("visibilitychange", function () { if (document.hidden) clearInterval(timer); else play(); });
    box.classList.add("tick");
    play();
  }

  /* ---------- カテゴリ一覧 ---------- */
  function renderCategories() {
    main.innerHTML = '<header class="page-head"><span class="en">Category</span><h1>カテゴリー</h1><p>6つの分野から、気になる「なぜ？」を探す。</p></header>' +
      '<div class="cat-list">' + Z.categories.map(function (c, i) { return catRow(c, i === 0); }).join("") + "</div>";
  }

  /* ---------- カテゴリ ---------- */
  function renderCategory() {
    secNo = 0;
    var c = cat(location.hash.slice(1)) || Z.categories[0];
    var p = photo(c.id, 0), list = topicsOf(c.id);
    document.title = c.name + "｜SOMOSOMO";
    main.innerHTML =
      '<nav class="crumbs" aria-label="現在地"><a href="' + u("index.html") + '">ホーム</a><span>/</span><a href="' + u("categories.html") + '">カテゴリ</a><span>/</span><span>' + esc(c.name) + "</span></nav>" +
      '<section class="cover cover-mid">' + (p ? img(p.src, "bg kb", true) : "") + '<span class="shade"></span>' +
      '<div class="cover-in"><span class="big-no">' + c.no + '</span><span class="en">' + c.en + "</span><h1><span class=\"band\">" + esc(c.name) + "</span></h1><p>" + esc(c.desc) + "</p></div>" + credit(p) + "</section>" +
      '<nav class="chips scroll" aria-label="カテゴリの切り替え">' + Z.categories.map(function (x) {
        return '<a href="' + catUrl(x.id) + '"' + (x.id === c.id ? ' class="on" aria-current="page"' : "") + ">" + esc(x.name) + "</a>";
      }).join("") + "</nav>" +
      catBody(c, list);
    window.scrollTo(0, 0);
  }

  function catBody(c, list) {
    var sorted = list.filter(function (t) { return t.status === "published"; }).sort(byNew).concat(list.filter(function (t) { return t.status !== "published"; }));
    var col = COL[c.id];
    var head = sorted.slice(0, 5), rest = sorted.slice(5);
    var hasF = function (t) { return HL[t.slug] && HL[t.slug].f; };
    var hls = rest.filter(hasF).concat(head.filter(hasF)).slice(0, 8);
    return (hls.length ? '<section class="sec">' + secHead("Highlights", "記事のハイライト") + '<p class="sec-note">各記事の「ここが面白い！」から。</p><div class="hl-rail">' + hls.map(function (t) {
        var p = topicPhoto(t);
        return '<a class="hlcard" href="' + articleUrl(t) + '"><span class="thumb">' + (p ? img(p.small) : "") + '</span><span class="hl-f">' + esc(HL[t.slug].f) + '</span><span class="hl-q">' + qh(t.q) + svg("arrow") + "</span></a>";
      }).join("") + "</div></section>" : "") +
      '<section class="sec">' + secHead("Stories", list.length + "の疑問") + mosaic(head, true) + "</section>" +
      (col ? '<section class="sec column dark-band"><div class="col-head"><span class="col-en">Column</span><span>編集部コラム</span></div><h2>' + esc(col.title) + "</h2>" +
        col.body.map(function (b, i) { return "<p" + (i === 0 ? ' class="col-lead"' : "") + ">" + esc(b) + "</p>"; }).join("") +
        '<div class="col-links"><span>この話を読む</span>' + col.links.map(topic).filter(Boolean).map(function (t) { return '<a href="' + articleUrl(t) + '">' + qh(t.q) + svg("arrow") + "</a>"; }).join("") + "</div>" +
        '<p class="col-sign">文：SOMOSOMO編集部</p></section>' : "") +
      (rest.length ? '<section class="sec">' + secHead("More in " + c.en.split(" ")[0], c.name + "のほかの疑問") + vlist(rest, true, 5) + "</section>" : "");
  }

  /* ---------- 特集一覧 ---------- */
  function renderFeatures() {
    main.innerHTML = '<header class="page-head"><span class="en">Special</span><h1>特集</h1><p>関連する疑問を読む順番に並べました。1つのテーマを、深く掘り下げる。</p></header>' +
      '<div class="fstack">' + F.map(fcard).join("") + "</div>" + feedHtml(false);
    startFeed("");
  }

  /* ---------- 特集 ---------- */
  function stepItem(t, i, id) {
    var tp = topicPhoto(t), c = cat(t.cat);
    return "<li" + (id ? ' id="' + id + '"' : "") + '><a href="' + articleUrl(t) + '"><span class="step"><small>' + (t.series ? "EP." : "STEP") + "</small><b>" + pad(i + 1) + "</b></span>" +
      '<span class="txt">' + (t.sub ? subLine(t, "cat-label") : '<span class="cat-label">' + esc(c.name) + "</span>") + "<h3>" + qh(t.q) + '</h3><span class="meta">' + readLabel(t) + "</span></span>" +
      '<span class="thumb">' + (tp ? img(tp.small) : "") + "</span></a></li>";
  }
  /* 部に分かれた連載（世界史の流れ）：目次から各部・各話へ飛べるようにする */
  function seriesBody(f, list) {
    var k = 0, read = list.filter(function (t) { return t.status === "published"; }).length;
    var parts = f.parts.map(function (pt, n) {
      var eps = list.slice(k, k + pt.count), from = k;
      k += pt.count;
      var pubs = eps.filter(function (t) { return t.status === "published" && t.cover; });
      return { pt: pt, n: n + 1, eps: eps, from: from, ph: pt.img ? { src: pt.img, small: pt.img } : pubs.length ? pubs[pubs.length - 1].cover : featurePhoto(f) };
    });
    var shelf = '<div class="shelf" role="group" aria-label="部の背表紙">' + parts.map(function (P) {
      return '<button type="button" class="spine" data-jump="part-' + P.n + '" style="--c:' + (P.pt.color || "#23211d") + ";--h:" + [96, 88, 92, 100, 97, 90][(P.n - 1) % 6] + '%"><b>' + pad(P.n) + '</b><span class="spine-t">' + esc(P.pt.title).replace(/\d+/g, '<span class="tcy">$&</span>') + '</span><small>' + esc(P.pt.era) + '</small><i class="spine-dot" aria-hidden="true"></i></button>';
    }).join("") + "</div>";
    var index = '<section class="sec" id="index">' + secHead("Index", "目次") + shelf +
      '<p class="series-note">' + esc(f.note || "") + "</p>" +
      '<ol class="series-index">' + parts.map(function (P) {
        return '<li><button type="button" class="pi-head" data-jump="part-' + P.n + '" style="--c:' + (P.pt.color || "#23211d") + '">' + (P.ph ? img(P.ph.small, "bg") : "") + '<span class="shade"></span><span class="pi-no">' + pad(P.n) + '</span><span class="pi-txt"><small>第' + P.n + "部 ・ " + esc(P.pt.era) + " ・ " + esc(P.pt.span) + "</small><b>" + esc(P.pt.title) + "</b></span>" + svg("chevron") + "</button>" +
          '<div class="pi-eps" role="group" aria-label="第' + P.n + '部の各話">' + P.eps.map(function (t, j) {
            var no = P.from + j + 1;
            var tp = t.status === "published" && t.cover;
            return '<button type="button" data-jump="ep-' + no + '" title="' + esc(t.q) + '"' + (t.status === "published" ? ' class="is-pub"' : "") + ">" + (tp ? img(tp.small) : "") + "<b>" + pad(no) + "</b>" + (tp ? "" : "<small>準備中</small>") + "</button>";
          }).join("") + "</div></li>";
      }).join("") + "</ol>" +
      (list[0] ? '<a class="series-start" href="' + articleUrl(list[0]) + '">第1話から読む' + svg("arrow") + "</a>" : "") +
      '<p class="series-count">公開中 ' + read + " / 全" + list.length + "話</p></section>";
    var body = parts.map(function (P) {
      return '<section class="sec part" id="part-' + P.n + '"><div class="part-head" style="--c:' + (P.pt.color || "#23211d") + '">' + (P.ph ? img(P.ph.src, "bg") : "") + '<span class="shade"></span><span class="part-no">' + pad(P.n) + '</span><div class="part-title"><span class="en">Part ' + pad(P.n) + " ・ " + esc(P.pt.en) + "</span><h2>第" + P.n + "部　" + esc(P.pt.title) + "</h2><small>" + esc(P.pt.era) + " ・ " + esc(P.pt.span) + "</small></div>" +
        '<button type="button" class="to-index" data-jump="index">目次へ</button></div>' +
        '<ol class="steps">' + P.eps.map(function (t, j) { return stepItem(t, P.from + j, "ep-" + (P.from + j + 1)); }).join("") + "</ol></section>";
    }).join("");
    return index + body;
  }
  function startJumps() {
    main.addEventListener("click", function (e) {
      var b = e.target.closest("[data-jump]");
      if (!b) return;
      var el = document.getElementById(b.getAttribute("data-jump"));
      if (el) el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" });
    });
  }
  function renderFeature() {
    secNo = 0;
    var f = feature(location.hash.slice(1)) || F[0];
    var p = featurePhoto(f);
    var list = f.articles.map(topic).filter(Boolean);
    document.title = f.title + "｜SOMOSOMO";
    main.innerHTML =
      '<nav class="crumbs" aria-label="現在地"><a href="' + u("index.html") + '">ホーム</a><span>/</span><a href="' + u("features.html") + '">特集</a><span>/</span><span>' + esc(f.title.split("　")[0]) + "</span></nav>" +
      '<section class="cover">' + (p ? img(p.src, "bg kb", true) : "") + '<span class="shade"></span>' +
      '<div class="cover-in"><span class="big-no">' + f.no + '</span><span class="en">Special ・ ' + f.en + "</span><h1><span class=\"band\">" + esc(f.title) + "</span></h1><p>" + esc(f.lead) + '</p><span class="meta">' + (f.parts ? "全" + list.length + "話 ・ " + f.parts.length + "部" : "全" + list.length + "記事") + "</span></div>" + credit(p) + "</section>" +
      (f.parts ? seriesBody(f, list) :
      '<section class="sec">' + secHead("How to Read", "この特集の読み方") +
      '<ol class="steps">' + list.map(function (t, i) { return stepItem(t, i); }).join("") + "</ol></section>") +
      '<section class="sec">' + secHead("More Specials", "ほかの特集", u("features.html")) +
      '<div class="feature-rail">' + F.filter(function (x) { return x.id !== f.id; }).map(fcard).join("") + "</div></section>" + feedHtml(false);
    startFeed("");
    window.scrollTo(0, 0);
  }

  /* ---------- 記事（準備中の表示） ---------- */
  function renderArticle() {
    secNo = 0;
    var t = topic(location.hash.slice(1)) || topic(Z.picks[0]);
    if (t.status === "published") { location.replace(articleUrl(t)); return; }
    var c = cat(t.cat), p = photo(t.cat, t.no);
    var feats = featuresWith(t.slug);
    document.title = t.q + "｜SOMOSOMO";
    main.innerHTML =
      '<nav class="crumbs" aria-label="現在地"><a href="' + u("index.html") + '">ホーム</a><span>/</span><a href="' + catUrl(c.id) + '">' + esc(c.name) + "</a></nav>" +
      '<article class="article"><header class="article-head"><span class="row-top"><a class="cat-label" href="' + catUrl(c.id) + '">' + esc(c.name) + "</a></span>" +
      "<h1>" + qh(t.q) + "</h1>" + subLine(t, "article-sub") + '<span class="meta">' + readLabel(t) + "</span></header>" +
      seriesBar(t) +
      '<figure class="article-photo">' + (p ? img(p.src, "kb", true) : "") + "</figure>" + credit(p) +
      '<div class="toc"><b>この記事は準備中です</b><p>公開まで、もう少しお待ちください。下の特集や関連する疑問から、先に読み進めることもできます。</p></div></article>' +
      moreSections(t) + feedHtml(false);
    startFeed("");
    window.scrollTo(0, 0);
  }
  /* 記事の下に並べる「入っている特集」「関連する疑問」「同じカテゴリ」 */
  function moreSections(t) {
    var c = cat(t.cat), feats = featuresWith(t.slug);
    var seen = {}; seen[t.slug] = 1;
    var nx = nextOf(t); if (nx) seen[nx.slug] = 1;
    var rel = t.related.map(topic).filter(function (x) { return x && !seen[x.slug] && x.status === "published"; });
    rel.forEach(function (x) { seen[x.slug] = 1; });
    var same = topicsOf(c.id).filter(function (x) { return !seen[x.slug] && x.status === "published"; });
    /* 本線の話 → その話から伸びる枝（公開済みだけ）。枝の記事 → 本線に戻る */
    var branches = Z.topics.filter(function (x) { return x.trunk === t.slug && x.status === "published"; });
    var trunk = t.trunk && topic(t.trunk);
    if (trunk && trunk.status !== "published") trunk = null;
    return nextStory(t) +
      (branches.length ? '<section class="sec">' + secHead("Branches", "いまにつながる話") + '<p class="sec-note">この時代から、いまの暮らしにつながっているもの。</p><div class="rows two">' + branches.map(row).join("") + "</div></section>" : "") +
      (trunk ? '<section class="sec">' + secHead("Main Line", esc(feature(trunk.series) ? feature(trunk.series).title.split("　")[0] : "本線") + "に戻る") + '<div class="rows two">' + row(trunk) + "</div></section>" : "") +
      (feats.length ? '<section class="sec">' + secHead("Special", "この疑問が入っている特集") + '<div class="feature-rail">' + feats.map(fcard).join("") + "</div></section>" : "") +
      (rel.length ? '<section class="sec">' + secHead("Related", "関連する疑問") + '<div class="rows two mosaic">' + rel.map(row).join("") + "</div></section>" : "") +
      '<section class="sec">' + secHead("Same Category", esc(c.name) + "のほかの疑問", catUrl(c.id)) + '<div class="rows two mosaic">' +
      same.map(row).join("") + "</div></section>";
  }

  /* 次に読む1本を、写真つきの大きな帯で（WIRED・Pen Online 風）。創刊5本は順番に、それ以外は関連する疑問の先頭へ */
  function nextOf(t) {
    var i = Z.picks.indexOf(t.slug);
    return t.series ? seriesNeighbor(t, 1) : topic(i >= 0 && i < Z.picks.length - 1 ? Z.picks[i + 1] : t.related[0]);
  }
  function nextStory(t) {
    var n = nextOf(t);
    if (!n) return "";
    var p = topicPhoto(n);
    return '<a class="next-story' + (p ? "" : " no-img") + '" href="' + articleUrl(n) + '">' + (p ? img(p.src, "bg") : "") + '<span class="shade"></span>' +
      '<span class="next-in"><span class="en">' + (n.series ? "Next Episode" : "Next Story") + '</span><span class="next-cat">' + (n.series ? epLabel(n) + " ・ " + esc(n.sub) : esc(cat(n.cat).name)) + "</span>" +
      "<b>" + qh(n.q) + '</b><span class="meta">' + readLabel(n) + '</span></span><span class="go">' + svg("arrow") + "</span></a>";
  }

  /* 連載（世界史の流れ）の前後の話と、「いまここ」を示す年表の帯 */
  function seriesNeighbor(t, d) {
    var f = feature(t.series);
    return f ? topic(f.articles[f.articles.indexOf(t.slug) + d]) : null;
  }
  function seriesBar(t) {
    var f = t.series && feature(t.series);
    if (!f) return "";
    var list = f.articles.map(topic).filter(Boolean), groups = [];
    list.forEach(function (x) {
      var era = (x.sub || "").split(" ")[0], g = groups[groups.length - 1];
      if (!g || g.era !== era) groups.push(g = { era: era, eps: [] });
      g.eps.push(x);
    });
    return '<nav class="series-bar" aria-label="' + esc(f.title) + 'の中の位置"><a class="sb-head" href="' + featureUrl(f.id) + '"><span class="en">' + esc(f.en) + "</span><b>" + esc(f.title.split("　")[0]) + '</b><span class="sb-ep"><i>' + pad(t.ep) + "</i> / " + list.length + "</span></a>" +
      '<ol class="sb-track">' + groups.map(function (g) {
        return '<li style="--n:' + g.eps.length + '"><span class="sb-cells">' + g.eps.map(function (x) {
          return '<a href="' + articleUrl(x) + '" title="第' + x.ep + "話　" + esc(x.q) + '" class="' + (x.slug === t.slug ? "is-now" : x.ep < t.ep ? "is-past" : "") + '"' + (x.slug === t.slug ? ' aria-current="page"' : "") + "></a>";
        }).join("") + "</span><small>" + esc(g.era) + "</small></li>";
      }).join("") + "</ol></nav>";
  }
  /* 記事に書いた「前回のあらすじ」「次の話へ」に、前後の話へのリンクを足す */
  function seriesLinks(t) {
    [[".recap", -1, "前回"], [".to-next", 1, "次回"]].forEach(function (a) {
      var box = document.querySelector(".story " + a[0]), n = seriesNeighbor(t, a[1]);
      if (box && n) box.insertAdjacentHTML("beforeend", '<a class="ep-link" href="' + articleUrl(n) + '"><small>' + a[2] + " ・ " + epLabel(n) + "</small><b>" + qh(n.q) + "</b>" + svg("arrow") + "</a>");
    });
  }

  /* 記事の流れ：章の見出しから目次を作り、「ひとことで言うと」の下に置く（UOMO・madameFIGARO.jp 風） */
  function storyToc() {
    var after = document.querySelector(".story .answer");
    var heads = document.querySelectorAll(".story .chapter, .story .fun");
    if (!after || heads.length < 2) return;
    var items = "";
    heads.forEach(function (h, i) {
      var h2 = h.querySelector("h2");
      if (!h2) return;
      if (!h.id) h.id = "sec-" + (i + 1);
      var parts = h2.innerHTML.split(/<br\s*\/?>/i), tmp = document.createElement("span");
      tmp.innerHTML = parts[parts.length - 1];
      var no = h.querySelector(".no");
      items += '<li><a href="#' + h.id + '"><i>' + (no ? esc(no.textContent) : "!") + "</i><span>" + esc(tmp.textContent) + "</span></a></li>";
    });
    after.insertAdjacentHTML("afterend", '<nav class="measure story-toc" aria-labelledby="toc-h"><div class="toc-head"><span class="en">Contents</span><b id="toc-h">この記事の流れ</b></div><ol>' + items + "</ol></nav>");
  }

  /* シェア：スマホは端末の共有シートを優先し、X・LINE・リンクのコピーも置く（HOUYHNHNM・UOMO 風） */
  function shareBar(t) {
    var url = location.href.split("#")[0], text = t.q + "｜SOMOSOMO";
    return '<section class="measure share" aria-labelledby="share-h"><span class="en">Share</span><b id="share-h">この「なぜ？」を、誰かに</b><div class="share-btns">' +
      (navigator.share ? '<button type="button" data-share>共有する</button>' : "") +
      '<a href="https://x.com/intent/tweet?text=' + encodeURIComponent(text) + "&url=" + encodeURIComponent(url) + '" target="_blank" rel="noopener">X</a>' +
      '<a href="https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(url) + '" target="_blank" rel="noopener">LINE</a>' +
      '<button type="button" data-copy>リンクをコピー</button></div></section>';
  }
  function startShare(t) {
    var box = document.querySelector(".share");
    if (!box) return;
    var url = location.href.split("#")[0];
    box.addEventListener("click", function (e) {
      if (e.target.closest("[data-share]")) navigator.share({ title: t.q, url: url }).catch(function () { /* 閉じただけ */ });
      var cp = e.target.closest("[data-copy]");
      if (cp && navigator.clipboard) navigator.clipboard.writeText(url).then(function () {
        cp.textContent = "コピーしました";
        setTimeout(function () { cp.textContent = "リンクをコピー"; }, 2000);
      });
    });
  }

  /* 折れ線グラフ：<div class="line-chart" data-points="1965:500 2020:60000" data-unit="ドル" data-marks="1965:独立">
     から、目盛り・線・最後の値・できごとの縦線を描く */
  function niceStep(v) {
    var p = Math.pow(10, Math.floor(Math.log10(v))), f = v / p;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
  }
  function drawLineCharts() {
    document.querySelectorAll(".line-chart[data-points]").forEach(function (box) {
      var pts = box.getAttribute("data-points").trim().split(/\s+/).map(function (s) { var a = s.split(":"); return { x: +a[0], y: +a[1] }; });
      if (pts.length < 2) return;
      var marks = (box.getAttribute("data-marks") || "").split(/\s*,\s*/).filter(Boolean).map(function (s) { var a = s.split(":"); return { x: +a[0], t: a.slice(1).join(":") }; });
      var unit = box.getAttribute("data-unit") || "";
      var W = 360, H = 230, L = 40, R = 12, T = 30, B = 24;
      var x0 = pts[0].x, x1 = pts[pts.length - 1].x;
      var ymax = Math.max.apply(null, pts.map(function (p) { return p.y; }));
      var ys = niceStep(ymax / 4), top = Math.ceil(ymax / ys) * ys;
      function X(x) { return L + (x - x0) / (x1 - x0) * (W - L - R); }
      function Y(y) { return T + (1 - y / top) * (H - T - B); }
      function n(v) { return Number(v).toLocaleString("ja-JP"); }
      var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(box.getAttribute("data-label") || "折れ線グラフ") + '">';
      for (var y = 0; y <= top; y += ys) s += '<line class="grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(y) + '" y2="' + Y(y) + '"/><text class="ax" x="' + (L - 6) + '" y="' + (Y(y) + 4) + '" text-anchor="end">' + n(y) + "</text>";
      var xs = niceStep((x1 - x0) / 4);
      for (var x = Math.ceil(x0 / xs) * xs; x <= x1; x += xs) s += '<text class="ax" x="' + X(x) + '" y="' + (H - 6) + '" text-anchor="middle">' + x + "</text>";
      if (unit) s += '<text class="unit" x="' + L + '" y="' + (T - 16) + '">単位：' + esc(unit) + "</text>";
      marks.forEach(function (m) {
        s += '<line class="mk" x1="' + X(m.x) + '" x2="' + X(m.x) + '" y1="' + (T - 4) + '" y2="' + (H - B) + '"/><text class="mk-t" x="' + (X(m.x) + 4) + '" y="' + (T + 8) + '">' + esc(m.t) + "</text>";
      });
      var line = pts.map(function (p) { return X(p.x).toFixed(1) + "," + Y(p.y).toFixed(1); }).join(" ");
      s += '<polygon class="area" points="' + X(x0) + "," + Y(0) + " " + line + " " + X(x1) + "," + Y(0) + '"/><polyline class="ln" points="' + line + '"/>';
      var last = pts[pts.length - 1];
      s += '<circle class="end" cx="' + X(last.x) + '" cy="' + Y(last.y) + '" r="4.5"/><text class="end-t" x="' + (X(last.x) - 8) + '" y="' + (Y(last.y) - 10) + '" text-anchor="end">' + n(last.y) + "</text></svg>";
      box.innerHTML = s;
    });
  }

  /* ---------- 公開済みの記事（articles/<slug>.html）：本文はページに書き、下の続きだけ組み立てる ---------- */
  function foldSources() {
    var ul = document.querySelector(".sources ul");
    if (!ul || ul.children.length <= 6) return;
    var n = ul.children.length;
    ul.classList.add("is-folded");
    ul.insertAdjacentHTML("afterend", '<button type="button" class="src-more">出典をすべて見る（' + n + "件）</button>");
    ul.nextElementSibling.addEventListener("click", function () { ul.classList.remove("is-folded"); this.remove(); });
  }
  /* 扉の題を色の帯に（TRANSIT 風）。文節の span（.nw）があればそれぞれを、なければ題全体を帯にする */
  function heroBand() {
    var h1 = document.querySelector(".story-hero h1");
    if (!h1 || h1.querySelector(".band")) return;
    if (!h1.querySelector(".nw")) h1.innerHTML = '<span class="band">' + h1.innerHTML + "</span>";
    h1.classList.add("is-band");
  }
  function renderStory() {
    var t = topic(document.body.getAttribute("data-slug"));
    var box = document.getElementById("story-more");
    heroBand();
    foldSources();
    storyToc();
    drawLineCharts();
    if (t && t.series) {
      var h1 = document.querySelector(".story-hero h1");
      if (h1 && !document.querySelector(".story-sub")) h1.insertAdjacentHTML("afterend", subLine(t, "story-sub"));
      var hero = document.querySelector(".story-hero");
      if (hero) hero.insertAdjacentHTML("afterend", seriesBar(t));
      seriesLinks(t);
    }
    if (t && box) { box.insertAdjacentHTML("beforebegin", shareBar(t)); startShare(t); box.innerHTML = moreSections(t) + feedHtml(false); startFeed(""); }

    /* 読んだ量を示す細い線 */
    var bar = document.getElementById("progress");
    if (bar) {
      var onScroll = function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ")";
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    /* 今と昔をくらべるスライダー */
    document.querySelectorAll(".compare").forEach(function (cmp) {
      var range = cmp.querySelector("input[type=range]");
      if (!range) return;
      var set = function () { cmp.style.setProperty("--pos", range.value + "%"); };
      range.addEventListener("input", set);
      set();
    });
  }

  /* ---------- 検索 ---------- */
  var RECENT_KEY = "kz-recent-searches";
  function loadRecent() { try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch (e) { return []; } }
  function saveRecent(list) { try { localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 6))); } catch (e) { /* 保存できない環境では何もしない */ } }
  function remember(q) {
    q = q.trim(); if (!q) return;
    var list = loadRecent().filter(function (x) { return x !== q; });
    list.unshift(q); saveRecent(list);
  }
  function matches(t, q) {
    var c = cat(t.cat);
    var hay = [t.q, c.name, t.tags.join(" "), featuresWith(t.slug).map(function (f) { return f.title; }).join(" ")].join(" ").toLowerCase();
    return q.toLowerCase().split(/\s+/).filter(Boolean).every(function (w) { return hay.indexOf(w) >= 0; });
  }
  function renderSearch() {
    var state = { q: "", cat: "" };
    var h = location.hash.slice(1);
    if (/^k\d+$/.test(h) && Z.keywords[+h.slice(1)]) state.q = Z.keywords[+h.slice(1)];
    if (/^c-/.test(h) && cat(h.slice(2))) state.cat = h.slice(2);

    main.innerHTML = '<header class="page-head"><span class="en">Search</span><h1>検索</h1></header>' +
      '<form class="search-box" role="search" id="sform"><label for="q" class="visually-hidden">キーワード</label>' +
      '<input id="q" type="search" placeholder="キーワードで記事を探す" autocomplete="off" enterkeyhint="search">' + svg("search") + "</form>" +
      '<div id="idle"></div><section class="sec" id="results"></section>';
    var input = document.getElementById("q");
    input.value = state.q;

    function draw() {
      secNo = 0;
      var q = state.q.trim();
      var idle = document.getElementById("idle");
      if (!q) {
        var recent = loadRecent();
        idle.innerHTML = '<section class="sec">' + secHead("Popular", "人気のキーワード") + '<div class="chips">' +
          Z.keywords.map(function (k) { return '<button type="button" data-kw="' + esc(k) + '">' + esc(k) + "</button>"; }).join("") + "</div></section>" +
          (recent.length ? '<section class="sec" style="margin-top:28px">' + secHead("Recent", "最近の検索") + '<ul class="recent">' + recent.map(function (r, i) {
            return '<li><button type="button" data-kw="' + esc(r) + '">' + svg("clock") + esc(r) + '</button><button type="button" class="del" data-del="' + i + '" aria-label="「' + esc(r) + '」を履歴から消す">' + svg("close") + "</button></li>";
          }).join("") + "</ul></section>" : "");
      } else {
        idle.innerHTML = "";
      }
      var list = Z.topics.filter(function (t) { return (!state.cat || t.cat === state.cat) && (!q || matches(t, q)); });
      document.getElementById("results").innerHTML =
        secHead(q ? "Results" : "All Stories", q ? "「" + esc(q) + "」の検索結果" : "すべての記事") +
        '<div class="chips scroll" role="group" aria-label="カテゴリで絞り込む">' +
        '<button type="button" data-cat="" aria-pressed="' + (!state.cat) + '">すべて</button>' +
        Z.categories.map(function (c) { return '<button type="button" data-cat="' + c.id + '" aria-pressed="' + (state.cat === c.id) + '">' + esc(c.name) + "</button>"; }).join("") + "</div>" +
        '<p class="result-count">' + list.length + "件</p>" +
        (list.length ? '<div class="rows two">' + list.map(row).join("") + "</div>" : '<p class="empty">見つかりませんでした。別のことばで探してみてください。</p>');
    }
    input.addEventListener("input", function () { state.q = input.value; draw(); });
    document.getElementById("sform").addEventListener("submit", function (e) { e.preventDefault(); remember(input.value); input.blur(); draw(); });
    main.addEventListener("click", function (e) {
      var kw = e.target.closest("[data-kw]"), del = e.target.closest("[data-del]"), cb = e.target.closest("[data-cat]");
      if (kw) { state.q = kw.getAttribute("data-kw"); input.value = state.q; remember(state.q); draw(); }
      if (del) { var l = loadRecent(); l.splice(+del.getAttribute("data-del"), 1); saveRecent(l); draw(); }
      if (cb) { state.cat = cb.getAttribute("data-cat"); draw(); }
    });
    if (state.q) remember(state.q);
    draw();
  }

  /* ---------- 写真クレジット ---------- */
  function renderCredits() {
    var box = document.getElementById("photo-credits");
    if (!box) return;
    box.innerHTML = Z.categories.map(function (c) {
      return "<h2>" + esc(c.name) + "</h2><ul>" + (P[c.id] || []).map(function (p) {
        return '<li><a href="' + esc(p.page) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>／" + esc(p.artist) + "（" + licenseJa(p.license) + "）</li>";
      }).join("") + "</ul>";
    }).join("");
  }

  /* ---------- 画像は読み込めたらふわっと出す ---------- */
  function fadeImages() {
    document.querySelectorAll("img").forEach(function (im) {
      if (im.complete) return;
      im.classList.add("is-loading");
      im.addEventListener("load", function () { im.classList.remove("is-loading"); }, { once: true });
      im.addEventListener("error", function () { im.classList.remove("is-loading"); }, { once: true });
    });
  }

  /* 初回だけ、誌名の幕を見せる。時間で必ず取り除くので、止まったままにはならない */
  function curtain() {
    if (REDUCED || page !== "home") return;
    try { if (sessionStorage.getItem("kz-curtain")) return; sessionStorage.setItem("kz-curtain", "1"); } catch (e) { return; }
    var c = document.createElement("div");
    c.className = "curtain"; c.setAttribute("aria-hidden", "true");
    c.innerHTML = '<span class="curtain-logo"><b>SOMO<i>SOMO</i></b><small>そもそも、なぜ？</small></span>';
    document.body.appendChild(c);
    setTimeout(function () { c.classList.add("is-up"); }, 900);
    setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 1700);
  }

  curtain();
  renderChrome();
  var R = { home: renderHome, categories: renderCategories, category: renderCategory, features: renderFeatures, feature: renderFeature, article: renderArticle, search: renderSearch, credits: renderCredits, story: renderStory };
  if (R[page]) R[page]();
  if (page === "feature") startJumps();
  fadeImages();
  if (page === "category" || page === "feature" || page === "article") window.addEventListener("hashchange", function () { R[page](); fadeImages(); });
  if (page === "search") window.addEventListener("hashchange", function () { location.reload(); });
  document.documentElement.classList.add("is-ready");
})();
