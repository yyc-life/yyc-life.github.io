const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
let articles = [];

function renderArticle(article) {
  const sections = Array.isArray(article.sections) ? article.sections : [];
  const body = sections.map((section) => `
    <section class="reader-section"><h2>${esc(section.heading)}</h2>
      ${(section.paragraphs || []).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
      ${section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}
    </section>`).join("");

  document.querySelector("#article-view").innerHTML = `
    <article class="longread ${esc(article.categoryClass || "")}">
      <div class="reader-paper">
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
    </article>`;
  document.title = `${article.title} — 卡村 KACUN`;
}

function showArticle(id, push = false) {
  const article = articles.find((item) => item.id === id);
  if (!article) return false;
  renderArticle(article);
  document.body.classList.add("reader-mode");
  if (push) history.pushState({ article: id }, "", `?article=${encodeURIComponent(id)}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
  return true;
}

async function init() {
  try {
    const response = await fetch("articles.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const edition = await response.json();
    articles = Array.isArray(edition.articles) ? edition.articles : [];
    const latest = articles[0];
    if (!latest) throw new Error("No articles are available");

    const requested = new URLSearchParams(location.search).get("article");
    showArticle(articles.some((item) => item.id === requested) ? requested : latest.id);
    window.addEventListener("popstate", () => {
      const id = new URLSearchParams(location.search).get("article");
      showArticle(articles.some((item) => item.id === id) ? id : latest.id);
    });
  } catch (error) {
    document.querySelector("#article-view").innerHTML = '<p class="loading">资讯暂时没有加载出来，请刷新页面再试。</p>';
    console.error("Could not load the Kacun edition:", error);
  }
}

init();
