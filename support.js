(function () {
  "use strict";

  var defaults = {
    reviews: {
      eyebrow: "CUSTOMER VOICES",
      title: "গ্রাহকদের মতামত",
      intro: "বাস্তব গ্রাহকের অনুমতি নিয়ে প্রকাশিত মতামত এখানে দেখানো হবে।",
      items: []
    },
    support: {
      enabled: true,
      title: "Soverix Net সহায়তা",
      welcome: "আসসালামু আলাইকুম! প্যাকেজ, সেটআপ বা সামঞ্জস্য নিয়ে প্রশ্ন করুন।",
      placeholder: "আপনার প্রশ্ন লিখুন…",
      button: "WhatsApp-এ মানব সহায়তা",
      handoffMessage: "সাইট থেকে সহায়তা চাই।",
      quickQuestions: ["প্যাকেজ ও দাম জানতে চাই", "সেটআপ কীভাবে করব?", "আমার ফোনে কাজ করবে কি?"]
    }
  };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  function numberOnly(value) {
    return String(value == null ? "" : value).replace(/\D/g, "");
  }

  function whatsappHref(number, message) {
    var digits = numberOnly(number);
    return digits ? "https://wa.me/" + digits + "?text=" + encodeURIComponent(message || "") : "#";
  }

  function addReviewNav() {
    var nav = document.querySelector(".navlinks");
    if (!nav || nav.querySelector('a[href="#reviews"]')) return;
    var link = document.createElement("a");
    link.href = "#reviews";
    link.textContent = "রিভিউ";
    nav.appendChild(link);
  }

  function renderReviews(data) {
    if (document.getElementById("reviews")) return;
    var cfg = Object.assign({}, defaults.reviews, data.reviews || {});
    var items = Array.isArray(cfg.items) ? cfg.items : [];
    var section = document.createElement("section");
    section.id = "reviews";
    section.className = "content sv-reviews";
    var cards = "";
    if (items.length) {
      cards = items.map(function (item) {
        var rating = Math.max(0, Math.min(5, Number(item.rating) || 0));
        var stars = rating ? "★".repeat(rating) + "☆".repeat(5 - rating) : "";
        return '<article class="card sv-review-card">' +
          (stars ? '<div class="sv-stars" aria-label="' + rating + ' out of 5 stars">' + stars + "</div>" : "") +
          '<p class="sv-review-text">“' + esc(item.text) + '”</p>' +
          '<div class="sv-review-by"><strong>' + esc(item.name || "গ্রাহক") + "</strong>" +
          (item.location ? "<span>" + esc(item.location) + "</span>" : "") + "</div>" +
          "</article>";
      }).join("");
    } else {
      cards = '<article class="card sv-review-empty"><div class="sv-empty-icon">✦</div>' +
        "<h3>আপনার মতামত এখানে প্রকাশিত হবে</h3>" +
        "<p>বাস্তব গ্রাহকের অনুমতি নিয়ে রিভিউ যোগ করুন। মতামত দিতে WhatsApp-এ লিখুন।</p>" +
        '<a class="btn wa sv-review-wa">WhatsApp-এ মতামত দিন</a></article>';
    }
    section.innerHTML = '<div class="eyebrow">' + esc(cfg.eyebrow) + "</div>" +
      "<h2>" + esc(cfg.title) + "</h2>" +
      '<p class="section-intro">' + esc(cfg.intro) + "</p>" +
      '<div class="grid sv-review-grid">' + cards + "</div>";
    var contact = document.querySelector(".contact");
    var contactSection = contact && contact.closest("section");
    var main = document.querySelector("main");
    if (contactSection) contactSection.before(section);
    else if (main) main.appendChild(section);
    else document.body.appendChild(section);
    var number = data.whatsapp || "";
    section.querySelectorAll(".sv-review-wa").forEach(function (a) {
      a.href = whatsappHref(number, "আমি Soverix Net-এর জন্য মতামত দিতে চাই।");
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
  }

  function installStyles() {
    if (document.getElementById("sv-support-styles")) return;
    var style = document.createElement("style");
    style.id = "sv-support-styles";
    style.textContent =
      ".sv-review-grid{align-items:stretch}.sv-review-card{display:flex;flex-direction:column;min-height:190px}.sv-review-text{font-size:18px;line-height:1.8;margin:10px 0 22px;flex:1}.sv-review-by{display:flex;gap:10px;align-items:center;color:var(--muted);font-size:14px}.sv-review-by span{padding-left:10px;border-left:1px solid var(--line)}.sv-stars{color:#ffd166;letter-spacing:2px;font-size:18px}.sv-review-empty{text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center}.sv-empty-icon{color:var(--accent);font-size:28px}.sv-review-empty h3{margin:8px 0}.sv-review-empty p{color:var(--muted);max-width:520px}.sv-review-empty .btn{margin-top:8px}" +
      "#sv-support-root{position:fixed;right:20px;bottom:78px;z-index:20;font-family:inherit}#sv-support-launcher{border:0;border-radius:999px;background:var(--accent,#4be2ba);color:#08271f;padding:13px 18px;font:700 15px/1.2 inherit;box-shadow:0 6px 24px #0008;cursor:pointer}#sv-support-panel{width:min(370px,calc(100vw - 28px));height:min(560px,calc(100vh - 150px));margin-bottom:10px;border:1px solid var(--line,#294051);border-radius:18px;background:var(--panel,#102436);box-shadow:0 16px 45px #0009;display:flex;flex-direction:column;overflow:hidden}#sv-support-panel[hidden]{display:none}.sv-support-head{padding:16px 17px;background:#12372f;border-bottom:1px solid #367967}.sv-support-head strong{display:block;font-size:17px}.sv-support-head span{display:block;color:#c4ddd5;font-size:12px;margin-top:3px}.sv-support-log{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:9px}.sv-msg{max-width:88%;padding:10px 12px;border-radius:12px;font-size:14px;line-height:1.65;white-space:pre-wrap}.sv-msg.bot{align-self:flex-start;background:#183246}.sv-msg.user{align-self:flex-end;background:#1c6656}.sv-support-quick{display:flex;gap:7px;flex-wrap:wrap;padding:0 14px 10px}.sv-quick{border:1px solid var(--line,#294051);background:transparent;color:var(--text,#f2f7fa);border-radius:999px;padding:6px 9px;font:12px inherit;cursor:pointer}.sv-support-form{display:flex;gap:7px;padding:11px 12px;border-top:1px solid var(--line,#294051)}.sv-support-form input{flex:1;min-width:0;border:1px solid var(--line,#294051);border-radius:9px;background:#0b1b2b;color:var(--text,#f2f7fa);padding:9px 10px;font:14px inherit}.sv-support-form button{border:0;border-radius:9px;background:var(--accent,#4be2ba);color:#08271f;padding:9px 11px;font-weight:700;cursor:pointer}.sv-support-handoff{display:block;text-align:center;color:var(--accent,#4be2ba);font-size:12px;padding:0 12px 10px}.sv-support-note{color:var(--muted,#b4c4ce);font-size:11px;padding:0 14px 8px}@media(max-width:760px){#sv-support-root{right:12px;bottom:72px}#sv-support-launcher{padding:11px 15px}.sv-review-text{font-size:16px}}";
    document.head.appendChild(style);
  }

  function findAnswer(question, data) {
    var q = String(question || "").trim().toLowerCase();
    var faq = data.faq && Array.isArray(data.faq.items) ? data.faq.items : [];
    var setup = data.setup && Array.isArray(data.setup.items) ? data.setup.items : [];
    if (!q) return "একটি প্রশ্ন লিখুন—প্যাকেজ, সেটআপ বা ফোনের সামঞ্জস্য সম্পর্কে জানতে পারেন।";
    if (/দাম|মূল্য|ফি|price|প্যাকেজ|মেয়াদ/.test(q)) {
      var price = faq.find(function (x) { return /দাম|মেয়াদ|ফি|মূল্য/.test(String(x.question || "")); });
      return price ? price.answer : "দাম ও মেয়াদ সিম ও প্যাকেজভেদে বদলায়। আপনার সিমের নাম জানিয়ে WhatsApp-এ বর্তমান তথ্য নিন।";
    }
    if (/সেটআপ|setup|অ্যাপ|কনফিগ|শুরু/.test(q)) {
      var setupText = setup.map(function (x) { return x.title + ": " + x.description; }).join("\n");
      return setupText || "আপনার সিমের নাম, বর্তমান প্যাকেজ ও ফোনের ধরন লিখে WhatsApp-এ সেটআপ নির্দেশনা নিন।";
    }
    if (/ফোন|মোবাইল|কাজ করবে|সামঞ্জস্য|android|ios/.test(q)) {
      var compatibility = faq.find(function (x) { return /ফোন|কাজ করবে|সামঞ্জস্য/.test(String(x.question || "")); });
      return compatibility ? compatibility.answer : "ফোনের মডেল, Android বা iOS সংস্করণ এবং সিমের নাম জানালে সামঞ্জস্য দেখে বলা যাবে।";
    }
    if (/সমস্যা|কানেকশন|সংযোগ|চলে না|error|ত্রুটি/.test(q)) {
      var trouble = faq.find(function (x) { return /কানেকশন|সমস্যা|চলে না/.test(String(x.question || "")); });
      return trouble ? trouble.answer : "সমস্যার বিবরণ ও স্ক্রিনশট WhatsApp-এ পাঠান। পাসওয়ার্ড বা ব্যক্তিগত তথ্য পাঠাবেন না।";
    }
    var tokens = q.split(/\s+/).filter(function (x) { return x.length > 1; });
    var best = null, bestScore = 0;
    faq.forEach(function (item) {
      var hay = (String(item.question || "") + " " + String(item.answer || "")).toLowerCase();
      var score = tokens.reduce(function (n, token) { return n + (hay.indexOf(token) >= 0 ? 1 : 0); }, 0);
      if (score > bestScore) { best = item; bestScore = score; }
    });
    return best && bestScore ? best.answer : "এই প্রশ্নের নির্দিষ্ট উত্তর আমার FAQ-তে নেই। নিচের WhatsApp বোতামে চাপলে মানব সহায়তা পাবেন।";
  }

  function renderSupport(data) {
    var cfg = Object.assign({}, defaults.support, data.support || {});
    if (cfg.enabled === false || document.getElementById("sv-support-root")) return;
    var root = document.createElement("div");
    root.id = "sv-support-root";
    root.innerHTML = '<button id="sv-support-launcher" type="button" aria-expanded="false" aria-controls="sv-support-panel">💬 সহায়তা</button>' +
      '<div id="sv-support-panel" hidden><div class="sv-support-head"><strong>' + esc(cfg.title) + '</strong><span>FAQ সহায়তা · প্রয়োজনে WhatsApp</span></div>' +
      '<div class="sv-support-log" aria-live="polite"></div><div class="sv-support-quick"></div>' +
      '<a class="sv-support-handoff" target="_blank" rel="noopener noreferrer">' + esc(cfg.button) + '</a>' +
      '<div class="sv-support-note">এটি দ্রুত FAQ সহায়তা; সংবেদনশীল তথ্য পাঠাবেন না।</div>' +
      '<form class="sv-support-form"><input aria-label="আপনার প্রশ্ন" placeholder="' + esc(cfg.placeholder) + '" autocomplete="off"><button type="submit">পাঠান</button></form></div>';
    document.body.appendChild(root);
    var launcher = root.querySelector("#sv-support-launcher");
    var panel = root.querySelector("#sv-support-panel");
    var log = root.querySelector(".sv-support-log");
    var input = root.querySelector("input");
    var form = root.querySelector("form");
    var handoff = root.querySelector(".sv-support-handoff");
    handoff.href = whatsappHref(data.whatsapp, cfg.handoffMessage);
    function addMessage(text, kind) {
      var el = document.createElement("div");
      el.className = "sv-msg " + kind;
      el.textContent = text;
      log.appendChild(el);
      log.scrollTop = log.scrollHeight;
    }
    function send(text) {
      var value = String(text || "").trim();
      if (!value) return;
      addMessage(value, "user");
      input.value = "";
      window.setTimeout(function () { addMessage(findAnswer(value, data), "bot"); }, 120);
    }
    launcher.addEventListener("click", function () {
      panel.hidden = !panel.hidden;
      launcher.setAttribute("aria-expanded", String(!panel.hidden));
      if (!panel.hidden) input.focus();
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      send(input.value);
    });
    var questions = Array.isArray(cfg.quickQuestions) && cfg.quickQuestions.length ? cfg.quickQuestions : (data.faq && data.faq.items || []).slice(0, 3).map(function (x) { return x.question; });
    var quick = root.querySelector(".sv-support-quick");
    questions.slice(0, 4).forEach(function (question) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "sv-quick";
      b.textContent = question;
      b.addEventListener("click", function () { send(question); });
      quick.appendChild(b);
    });
    addMessage(cfg.welcome, "bot");
  }

  function start(data) {
    data = data || {};
    installStyles();
    addReviewNav();
    renderReviews(data);
    renderSupport(data);
  }

  fetch("site-data.json?support-cache=" + Date.now())
    .then(function (response) { return response.ok ? response.json() : {}; })
    .catch(function () { return {}; })
    .then(start);
})();