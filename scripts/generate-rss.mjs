import { readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://yyc-life.github.io/";
const xml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
})[char]);
const edition = JSON.parse(await readFile(new URL("../articles.json", import.meta.url), "utf8"));
const articles = Array.isArray(edition.articles) ? edition.articles : [];
const items = articles.map((article) => {
  const url = new URL(`?article=${encodeURIComponent(article.id)}`, siteUrl).href;
  const description = [article.summary, `来源：${article.source || "卡村 KACUN"}`].join("\n\n");
  const date = new Date(`${article.date}T12:00:00Z`);
  return `    <item>\n      <title>${xml(article.title)}</title>\n      <link>${xml(url)}</link>\n      <guid isPermaLink="false">${xml(article.id)}</guid>\n      <pubDate>${date.toUTCString()}</pubDate>\n      <description>${xml(description)}</description>\n      <category>${xml(article.category)}</category>\n    </item>`;
}).join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>卡村 KACUN — Calgary 本地新闻</title>
    <link>${siteUrl}</link>
    <description>卡尔加里本地资讯、生活提醒与吃喝玩乐。中文原创整理，附原始来源。</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}feed.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
${items}
  </channel>
</rss>
`;
await writeFile(new URL("../feed.xml", import.meta.url), feed);
console.log(`Generated feed.xml with ${articles.length} articles.`);
