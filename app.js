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
      <h3>${esc(article.title)}</h3>
      <p class="story-summary">${esc(article.summary)}</p>
      <p class="story-takeaway"><span>卡村划重点</span>${esc(article.takeaway)}</p>
      <div class="source-dates">来源日期 / 活动周：${esc(article.sourceDate)} · 卡村核对：${esc(article.verifiedAt)}</div>
      <div class="story-source"><span>${esc(article.sourceType || "来源")}：${esc(article.source)}${article.author ? ` · ${esc(article.author)}` : ""}</span><a href="${esc(article.url)}" target="_blank" rel="noopener">读原文 ↗</a></div>
    </article>`).join("");
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
  updateTime();
  setInterval(updateTime, 60_000);
  try {
    const response = await fetch("articles.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const edition = await response.json();
    articles = Array.isArray(edition.articles) ? edition.articles : [];
    document.querySelector("#updated-date").textContent = edition.updatedLabel || edition.updatedAt || "持续更新";
    renderStories();
  } catch (error) {
    document.querySelector("#stories").innerHTML = '<p class="loading">资讯暂时没有加载出来，请刷新页面再试。</p>';
    console.error("Could not load the Kacun edition:", error);
  }
}

init();
