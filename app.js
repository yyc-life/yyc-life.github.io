const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
let articles = [];

const dateLabel = (date) => {
  const current = new Date(`${date}T12:00:00`);
  const today = new Date();
  const isToday = current.toDateString() === today.toDateString();
  const isYesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toDateString() === current.toDateString();
  if (isToday) return "今天";
  if (isYesterday) return "昨天";
  return new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric" }).format(current);
};

function renderProfile() {
  const groups = Object.groupBy(articles, (article) => article.date || "");
  const feed = Object.entries(groups).map(([date, items]) => {
    const [featured, ...rest] = items;
    const compactItems = rest.map((article) => `
      <a class="feed-compact" href="?article=${encodeURIComponent(article.id)}" aria-label="阅读：${esc(article.title)}">
        <span class="compact-copy"><span class="feed-category">${esc(article.category)}</span><strong>${esc(article.title)}</strong><span class="feed-summary">${esc(article.summary)}</span><span class="feed-meta">来源：${esc(article.source)} · ${esc(article.sourceDate)}</span></span>
        <span class="compact-arrow" aria-hidden="true">↗</span>
      </a>`).join("");

    return `
      <section class="day-group" aria-label="${esc(date)} 的文章">
        <p class="day-label">${esc(dateLabel(date))}<span>${esc(date)}</span></p>
        <a class="feed-feature" href="?article=${encodeURIComponent(featured.id)}">
          <div class="feature-art ${esc(featured.categoryClass || "")}" aria-hidden="true"><span class="art-top">KACUN · 卡村今日选读</span><span class="art-category">${esc(featured.category)}</span><span class="art-title">${esc(featured.title)}</span><span class="art-bottom">CALGARY · ${esc(date)}</span><i></i></div>
          <div class="feature-copy"><span class="feed-category">${esc(featured.category)}</span><h2>${esc(featured.title)}</h2><p>${esc(featured.summary)}</p><span class="feed-meta">来源：${esc(featured.source)} · ${esc(featured.sourceDate)}</span><span class="read-link">阅读全文 <b aria-hidden="true">↗</b></span></div>
        </a>
        ${compactItems ? `<div class="feed-compact-list">${compactItems}</div>` : ""}
      </section>`;
  }).join("");

  document.querySelector("#app").innerHTML = `
    <main class="account-page" id="top">
      <header class="account-profile">
        <div class="profile-topline"><div class="brand-avatar" aria-label="卡村文字标识"><span>卡</span><i>K</i></div><div class="profile-name"><h1>卡村 KACUN</h1><p>加拿大 · Calgary</p></div><div class="profile-more" aria-hidden="true">···</div></div>
        <p class="profile-bio">卡尔加里年轻人的本地生活指南。每天发现新鲜事、好吃的、好玩的，也把值得留意的城市消息讲清楚。</p>
        <div class="profile-stats"><span><b>${articles.length}</b> 篇原创整理</span><span><b>Calgary</b> 本地更新</span></div>
        <div class="profile-actions"><a class="action-primary" href="#articles">看看今天有什么 <span aria-hidden="true">↓</span></a><button class="action-share" type="button" id="share-button">分享主页</button></div>
      </header>
      <nav class="profile-tabs" aria-label="内容分类"><a class="tab active" href="#articles" aria-current="page">全部</a><a class="tab" href="#articles">文章 <span>${articles.length}</span></a><span class="tab-spacer"></span><span class="tab-note">卡村新鲜速递</span></nav>
      <section class="profile-feed" id="articles" aria-label="卡村文章">${feed}<p class="feed-end">— 这里是卡村，Calgary 不无聊 —</p></section>
      <footer class="account-footer"><span>卡村 KACUN</span><p>AI 根据公开来源独立整理 · 点击文章查看原始来源</p><a href="https://yyc-life.github.io/">回到主页 ↑</a></footer>
    </main>`;
  document.body.className = "profile-mode";
  document.title = "卡村 KACUN — Calgary 不无聊";
  document.querySelector("#share-button")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(location.origin + location.pathname);
      const button = document.querySelector("#share-button");
      button.textContent = "已复制链接";
      setTimeout(() => { button.textContent = "分享主页"; }, 1800);
    } catch {
      window.prompt("复制卡村主页链接", location.origin + location.pathname);
    }
  });
}

function renderArticle(article) {
  const sections = Array.isArray(article.sections) ? article.sections : [];
  const body = sections.map((section) => `
    <section class="reader-section"><h2>${esc(section.heading)}</h2>
      ${(section.paragraphs || []).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
      ${section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}
    </section>`).join("");

  document.querySelector("#app").innerHTML = `
    <main class="article-page" id="top">
      <a class="reader-back" href="/">‹ 卡村主页</a>
      <article class="longread">
        <div class="reader-paper">
          <p class="reader-category">${esc(article.category)} <span>·</span> 卡村 KACUN</p>
          <h1>${esc(article.title)}</h1>
          <div class="reader-byline"><span><b>卡村 KACUN</b><small>AI 资讯整理 · ${esc(article.dateLabel || article.date)}</small></span><span class="byline-time">${esc(article.category)}</span></div>
          <p class="reader-source-credit">资料来源：${esc(article.source)} · 原文日期 ${esc(article.sourceDate)}</p>
          <p class="reader-deck">${esc(article.deck || article.summary)}</p>
          <p class="reader-lede">${esc(article.lede || article.summary)}</p>
          ${body}
          <aside class="reader-takeaway"><span>卡村划重点</span><p>${esc(article.takeaway)}</p></aside>
          <div class="reader-source-box"><p class="reader-source-label">信息来源 · 可回原文核对</p><b>${esc(article.sourceType || "来源")}：${esc(article.source)}${article.author ? ` · ${esc(article.author)}` : ""}</b><p>来源日期 / 活动周：${esc(article.sourceDate)}　|　卡村核对：${esc(article.verifiedAt)}</p><a href="${esc(article.url)}" target="_blank" rel="noopener">打开原始报道或公告 ↗</a></div>
          <p class="reader-disclaimer">本文由卡村 KACUN AI 根据公开来源整理，不是原文全文转载。活动、交通、健康及公共服务信息，请以机构或主办方的最新页面为准。</p>
          <div class="reader-endmark">— END —</div>
        </div>
      </article>
    </main>`;
  document.body.className = "article-mode";
  document.title = `${article.title} — 卡村 KACUN`;
}

async function init() {
  try {
    const response = await fetch("articles.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const edition = await response.json();
    articles = Array.isArray(edition.articles) ? edition.articles : [];
    if (!articles.length) throw new Error("No articles are available");
    const requested = new URLSearchParams(location.search).get("article");
    const article = articles.find((item) => item.id === requested);
    if (article) renderArticle(article); else renderProfile();
    window.addEventListener("popstate", () => {
      const id = new URLSearchParams(location.search).get("article");
      const next = articles.find((item) => item.id === id);
      if (next) renderArticle(next); else renderProfile();
    });
  } catch (error) {
    document.querySelector("#app").innerHTML = '<main class="account-page"><p class="loading">资讯暂时没有加载出来，请刷新页面再试。</p></main>';
    console.error("Could not load the Kacun edition:", error);
  }
}

init();
