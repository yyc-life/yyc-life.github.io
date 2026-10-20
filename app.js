const sources = [
  { name: "City of Calgary", focus: "市政公告、供水、道路与社区服务", url: "https://newsroom.calgary.ca/en/", kind: "官方" },
  { name: "Calgary Police Service", focus: "警方公告与公共安全提醒", url: "https://newsroom.calgary.ca/police-news-releases/", kind: "官方" },
  { name: "Calgary Transit", focus: "公交线路与出行服务更新", url: "https://www.calgarytransit.com/content/transit/en/home/service-updates.html", kind: "官方" },
  { name: "CBC Calgary", focus: "本地新闻与社区报道", url: "https://www.cbc.ca/news/canada/calgary", kind: "媒体" },
  { name: "Global News Calgary", focus: "城市新闻与社区故事", url: "https://globalnews.ca/calgary/", kind: "媒体" },
  { name: "CTV News Calgary", focus: "卡城与南艾省新闻", url: "https://calgary.ctvnews.ca/", kind: "媒体" },
  { name: "Calgary Herald", focus: "城市政策、商业与文化", url: "https://calgaryherald.com/", kind: "媒体" },
  { name: "LiveWire Calgary", focus: "社区、市政与城市发展", url: "https://livewirecalgary.com/", kind: "媒体" },
  { name: "Calgary Citizen", focus: "市政、商业、美食与文化", url: "https://calgarycitizen.com/subscribe", kind: "媒体" },
  { name: "Avenue Calgary", focus: "餐饮、城市生活与新店消息", url: "https://www.avenuecalgary.com/", kind: "生活" },
  { name: "YYC Current", focus: "演出、喜剧、市集与周末活动", url: "https://yyccurrent.ca/", kind: "活动" },
  { name: "Tourism Calgary", focus: "节庆、景点与城市体验", url: "https://www.visitcalgary.com/events", kind: "活动" },
  { name: "Calgary Public Library", focus: "免费讲座、工作坊与社区活动", url: "https://www.calgarylibrary.ca/events-and-programs/programs", kind: "活动" },
  { name: "卡尔加里微生活", focus: "华人社区资讯；微信号 canadawelife", url: "https://weixin.sogou.com/weixin?type=1&query=canadawelife", kind: "微信" },
  { name: "卡尔加里吃喝玩乐", focus: "本地餐饮与休闲；历史资料列出微信号 fanta7kaerjiali", url: "https://weixin.sogou.com/weixin?type=1&query=fanta7kaerjiali", kind: "微信" }
];

const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
let articles = [];
let activeCategory = "全部";

function renderSources() {
  document.querySelector("#source-list").innerHTML = sources.map((source) => `
    <a class="source-item" href="${esc(source.url)}" target="_blank" rel="noopener">
      <span class="source-kind">${esc(source.kind)}</span><span class="source-name">${esc(source.name)}</span>
      <span class="source-focus">${esc(source.focus)}</span><span class="source-arrow">↗</span>
    </a>`).join("");
}

function renderStories() {
  const query = document.querySelector("#search").value.trim().toLocaleLowerCase();
  const visible = articles.filter((article) => {
    const categoryMatches = activeCategory === "全部" || article.category === activeCategory;
    const searchMatches = !query || `${article.title} ${article.summary} ${article.source} ${article.category}`.toLocaleLowerCase().includes(query);
    return categoryMatches && searchMatches;
  });
  document.querySelector("#article-count").textContent = String(visible.length).padStart(2, "0");
  document.querySelector("#empty-state").classList.toggle("hidden", visible.length > 0);
  document.querySelector("#stories").innerHTML = visible.map((article, index) => `
    <article class="story-card ${index === 0 ? "featured" : ""}">
      <div class="story-card-head"><span class="category ${esc(article.categoryClass || "")}">${esc(article.category)}</span><time datetime="${esc(article.date)}">AI 摘要 · ${esc(article.dateLabel || article.date)}</time></div>
      <h3><a class="story-title-link" href="?article=${encodeURIComponent(article.id)}">${esc(article.title)}</a></h3>
      <p class="story-summary">${esc(article.summary)}</p>
      <p class="story-takeaway"><span>卡村划重点</span>${esc(article.takeaway)}</p>
      <div class="source-dates">来源日期 / 活动周：${esc(article.sourceDate)} · 卡村核对：${esc(article.verifiedAt)}</div>
      <div class="story-source"><span>${esc(article.sourceType || "来源")}：${esc(article.source)}</span><a class="read-story" href="?article=${encodeURIComponent(article.id)}">阅读全文 ↗</a></div>
    </article>`).join("");
}

function renderArticle(article) {
  const sections = Array.isArray(article.sections) ? article.sections : [];
  const body = sections.map((section, index) => `
    <section class="reader-section"><div class="reader-section-kicker">${String(index + 1).padStart(2, "0")} <span>/</span> ${esc(article.category)}</div><h2>${esc(section.heading)}</h2>
      ${(section.paragraphs || []).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
      ${section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}
    </section>`).join("");
  document.querySelector("#article-view").innerHTML = `
    <a class="reader-back" href="#" data-back>← 返回卡村情报</a>
    <article class="longread ${esc(article.categoryClass || "")}">
      <div class="reader-cover"><span class="reader-cover-label">KACUN · YYC / ${esc(article.category)}</span><strong>${esc(article.coverLine || "卡村新鲜事")}</strong><small>CALGARY, ALBERTA · ${esc(article.date)}</small><span class="cover-orbit"></span></div>
      <div class="reader-paper">
        <p class="reader-category">${esc(article.category)} <span>·</span> AI 整理</p>
        <h1>${esc(article.title)}</h1>
        <p class="reader-deck">${esc(article.deck || article.summary)}</p>
        <div class="reader-byline"><span class="byline-dot">K</span><span><b>卡村 KACUN 编辑部</b><small>综合整理 · ${esc(article.dateLabel || article.date)}</small></span><span class="byline-time">YYC / MT</span></div>
        <p class="reader-lede">${esc(article.lede || article.summary)}</p>
        ${body}
        <aside class="reader-takeaway"><span>卡村划重点</span><p>${esc(article.takeaway)}</p></aside>
        <div class="reader-source-box"><p class="reader-source-label">信息来源 · 可回原文核对</p><b>${esc(article.sourceType || "来源")}：${esc(article.source)}${article.author ? ` · ${esc(article.author)}` : ""}</b><p>来源日期 / 活动周：${esc(article.sourceDate)}　|　卡村核对：${esc(article.verifiedAt)}</p><a href="${esc(article.url)}" target="_blank" rel="noopener">打开原始报道或公告 ↗</a></div>
        <p class="reader-disclaimer">本文由卡村 KACUN 编辑部根据公开来源独立整理，不是原文全文转载。动态信息以来源页面的最新更新为准。</p>
        <div class="reader-endmark">— END —</div>
      </div>
    </article>`;
}

function showArticle(id, push = false) {
  const article = articles.find((item) => item.id === id);
  if (!article) return false;
  renderArticle(article);
  document.querySelector("#home-view").classList.add("hidden");
  document.querySelector("#article-view").classList.remove("hidden");
  if (push) history.pushState({ article: id }, "", `?article=${encodeURIComponent(id)}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.title = `${article.title} — 卡村 KACUN`;
  return true;
}

function showHome(push = false) {
  document.querySelector("#article-view").classList.add("hidden");
  document.querySelector("#home-view").classList.remove("hidden");
  if (push) history.pushState({}, "", window.location.pathname);
  document.title = "卡村 KACUN — Calgary 新鲜资讯";
}

function updateTime() {
  const now = new Date();
  document.querySelector("#clock").textContent = new Intl.DateTimeFormat("zh-CN", { timeZone: "America/Edmonton", hour: "2-digit", minute: "2-digit" }).format(now);
}

async function init() {
  renderSources();
  document.querySelectorAll(".nav-link").forEach((button) => button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.toggle("active", item === button));
    renderStories();
    document.querySelector("#feed-title").scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  document.querySelector("#search").addEventListener("input", renderStories);
  document.querySelector("#stories").addEventListener("click", (event) => {
    const link = event.target.closest(".story-title-link, .read-story");
    if (!link) return;
    event.preventDefault();
    const id = new URL(link.href).searchParams.get("article");
    showArticle(id, true);
  });
  document.querySelector("#article-view").addEventListener("click", (event) => {
    if (!event.target.closest("[data-back]")) return;
    event.preventDefault();
    showHome(true);
  });
  window.addEventListener("popstate", () => {
    const id = new URLSearchParams(location.search).get("article");
    if (!id || !showArticle(id)) showHome();
  });
  updateTime();
  setInterval(updateTime, 60_000);
  try {
    const response = await fetch("articles.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const edition = await response.json();
    articles = Array.isArray(edition.articles) ? edition.articles : [];
    document.querySelector("#updated-date").textContent = edition.updatedLabel || edition.updatedAt || "持续更新";
    renderStories();
    const initialArticle = new URLSearchParams(location.search).get("article");
    if (initialArticle) showArticle(initialArticle);
  } catch (error) {
    document.querySelector("#stories").innerHTML = '<p class="loading">资讯暂时没有加载出来，请刷新页面再试。</p>';
    console.error("Could not load the Kacun edition:", error);
  }
}

init();
