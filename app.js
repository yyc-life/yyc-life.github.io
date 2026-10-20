const STORAGE_KEY = "kacun-editorial-v1";

const sourceDirectory = [
  { group: "官方公告", label: "OFFICIAL SIGNALS", entries: [
    { name: "City of Calgary Newsroom", desc: "市政服务、工程、政策与官方公告", type: "官方", url: "https://newsroom.calgary.ca/en/", mark: "YYC", feed: "RSS：新闻稿与 Feature 分栏" },
    { name: "Calgary Police News Releases", desc: "警方公告、安全提醒与媒体发布", type: "官方", url: "https://newsroom.calgary.ca/police-news-releases/", mark: "CPS", feed: "City Newsroom 分类页" },
    { name: "Calgary Transit Alerts", desc: "公交服务中断、线路与出行提醒", type: "官方", url: "https://www.calgarytransit.com/content/transit/en/home/service-updates.html", mark: "CT", feed: "服务更新" },
    { name: "Parks Canada — Banff", desc: "国家公园、户外安全与季节公告", type: "官方", url: "https://parks.canada.ca/pn-np/ab/banff", mark: "PC", feed: "网站更新" }
  ]},
  { group: "本地新闻", label: "NEWSROOMS", entries: [
    { name: "CBC Calgary", desc: "城市新闻、社区、交通与天气", type: "媒体", url: "https://www.cbc.ca/news/canada/calgary", mark: "CBC", feed: "RSS：cbc.ca/webfeed/rss/rss-canada-calgary" },
    { name: "Global News Calgary", desc: "本地新闻、消费提醒与社区故事", type: "媒体", url: "https://globalnews.ca/calgary/", mark: "GN", feed: "RSS：globalnews.ca/calgary/feed/" },
    { name: "CTV News Calgary", desc: "南艾省新闻与突发消息", type: "媒体", url: "https://calgary.ctvnews.ca/", mark: "CTV", feed: "网站更新；RSS 端点需再验证" },
    { name: "Calgary Herald", desc: "市政、商业、文化与本地报道", type: "媒体", url: "https://calgaryherald.com/", mark: "CH", feed: "RSS 端点需再验证；部分内容付费" },
    { name: "LiveWire Calgary", desc: "市政、社区与城市发展报道", type: "媒体", url: "https://livewirecalgary.com/", mark: "LW", feed: "邮件通讯" },
    { name: "Calgary Citizen", desc: "市政、开发、商业、美食与文化", type: "媒体", url: "https://calgarycitizen.com/subscribe", mark: "CC", feed: "每周邮件通讯" }
  ]},
  { group: "华人内容源", label: "CHINESE COMMUNITY MEDIA", entries: [
    { name: "卡尔加里微生活", desc: "卡城华人资讯与生活内容；历史公开资料列出的微信号为 canadawelife", type: "华人媒体", url: "https://weixin.sogou.com/weixin?type=1&query=canadawelife", mark: "微", feed: "微信内搜索 canadawelife；暂无可验证 RSS，逐篇核实原文、时效与授权" }
  ]},
  { group: "吃喝玩乐", label: "GO OUT & EAT WELL", entries: [
    { name: "Avenue Calgary", desc: "探店、美食、新店与城市生活", type: "生活", url: "https://www.avenuecalgary.com/", mark: "AV", feed: "邮件通讯；RSS 端点需核实" },
    { name: "YYC Current", desc: "演出、喜剧、市集、户外与社区活动日历", type: "活动", url: "https://yyccurrent.ca/", mark: "YC", feed: "周四邮件与 RSS；数据/API 复用需另确认" },
    { name: "Tourism Calgary Events", desc: "节庆、展览、美食与访客活动", type: "活动", url: "https://www.visitcalgary.com/events", mark: "TC", feed: "活动日历" },
    { name: "Calgary Public Library Events", desc: "讲座、工作坊、儿童与社区活动", type: "活动", url: "https://www.calgarylibrary.ca/events-and-programs/programs", mark: "CPL", feed: "活动日历" }
  ]}
];

const starterState = {
  stories: [
    { id: "idea-city", title: "新人刚到卡村：哪些市府页面值得先收藏？", category: "生活攻略", source: "City of Calgary", url: "https://www.calgary.ca/", author: "", date: "编辑灵感", status: "准备写作", authorized: false, notes: "从官方服务页出发，整理地址变更、垃圾回收、交通和社区服务入口。独立编写，不复制页面文案。", excerpt: "" },
    { id: "idea-weekend", title: "周末活动别只刷短视频：做一份 YYC 活动雷达", category: "周末计划", source: "YYC Current", url: "https://yyccurrent.ca/", author: "", date: "编辑灵感", status: "待核实", authorized: false, notes: "探索如何按预算、交通方式、是否适合约会来筛选活动；每个活动回到主办方页面核实。", excerpt: "" },
    { id: "idea-food", title: "约饭不踩空：新店信息从哪里交叉确认？", category: "吃喝玩乐", source: "Avenue Calgary", url: "https://www.avenuecalgary.com/", author: "", date: "编辑灵感", status: "待筛选", authorized: false, notes: "餐厅营业时间、菜单和地址优先核对商家官方渠道；报道用于发现选题，照片另查授权。", excerpt: "" }
  ],
  drafts: [
    { id: "draft-welcome", title: "卡村不无聊：编辑部开张了", storyId: "", updated: "今天", body: "嗨，我们是卡村 KACUN。\n\n从本周末去哪儿，到哪家新店值得排进清单，再到影响每天出行的城市消息，我们想用住在卡尔加里的视角，把值得关注的事说清楚。\n\n这里会有：本地新鲜事、吃喝玩乐、活动日历和实用生活攻略。信息尽量回到官方或原始来源核对；每篇都附上出处和原文链接。\n\n如果你在卡尔加里，也欢迎把想看的主题告诉我们。" },
    { id: "draft-digest", title: "一周 YYC：吃喝玩乐选题模板", storyId: "", updated: "今天", body: "【本周卡村雷达】\n\n① 本地新鲜事\n用自己的话说明这条消息对居民有什么影响，并标注原始来源、作者和日期。\n\n② 周末去处\n从活动主办方核实时间、地点、价格和预约方式。\n\n③ 吃喝发现\n营业信息回到商家官方渠道核对。图片请使用自有、已获许可或明确可商用的素材。\n\n我们做的是原创生活整理与说明；未获授权时，不转载整篇报道或原文图片。" }
  ]
};

let state = loadState();
let selectedDraftId = state.drafts[0]?.id ?? "";
let activeFilter = "全部";

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.stories) && Array.isArray(saved.drafts)) return saved;
  } catch (error) { console.warn("Could not read saved KACUN data", error); }
  return structuredClone(starterState);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateCounts();
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function updateCounts() {
  const openCount = state.stories.filter((story) => story.status !== "已发布").length;
  const writingCount = state.stories.filter((story) => ["准备写作", "草稿中"].includes(story.status)).length;
  document.querySelector("#inbox-count").textContent = String(openCount).padStart(2, "0");
  document.querySelector("#draft-count").textContent = String(state.drafts.length).padStart(2, "0");
  document.querySelector("#stat-inbox").textContent = String(openCount).padStart(2, "0");
  document.querySelector("#stat-drafts").textContent = String(writingCount).padStart(2, "0");
  document.querySelector("#filter-all-count").textContent = String(state.stories.length).padStart(2, "0");
  document.querySelector("#draft-panel-count").textContent = `${String(state.drafts.length).padStart(2, "0")} 篇`;
}

function renderHome() {
  const list = document.querySelector("#home-stories");
  list.innerHTML = state.stories.slice(0, 3).map((story, index) => `
    <article class="story-card">
      <div class="story-card-top"><span class="source-type"><span class="source-orb">${escapeHtml((story.source || "K").slice(0, 2))}</span>${escapeHtml(story.source || "卡村编辑部")}</span><span class="story-status ${story.status === "待筛选" ? "pending" : ""}">${escapeHtml(story.status)}</span></div>
      <h3>${escapeHtml(story.title)}</h3><p>${escapeHtml(story.notes || "补充事实核对与编辑角度，再决定是否进入草稿。")}</p>
      <div class="story-card-foot"><span>选题 ${String(index + 1).padStart(2, "0")}</span><span>·</span><span>${escapeHtml(story.category)}</span><button data-story-draft="${escapeHtml(story.id)}">写成草稿 ↗</button></div>
    </article>`).join("");
  document.querySelector("#home-source-pills").innerHTML = sourceDirectory.flatMap((group) => group.entries).slice(0, 6).map((source) => `<button class="source-pill" data-source-url="${escapeHtml(source.url)}"><i>↗</i>${escapeHtml(source.name)}</button>`).join("");
}

function categoryGroup(category = "") {
  if (category.includes("吃喝")) return "吃喝";
  if (category.includes("资讯")) return "资讯";
  if (category.includes("攻略")) return "攻略";
  return "其他";
}

function renderInbox() {
  const query = document.querySelector("#search-stories").value.trim().toLowerCase();
  const filtered = state.stories.filter((story) => {
    const matchesCategory = activeFilter === "全部" || categoryGroup(story.category) === activeFilter;
    const matchesQuery = !query || `${story.title} ${story.source} ${story.notes}`.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
  document.querySelector("#inbox-list").innerHTML = filtered.length ? filtered.map((story) => `
    <div class="story-row" data-row-story="${escapeHtml(story.id)}">
      <div class="story-title-cell"><span class="story-mini-icon">${story.authorized ? "✓" : "↘"}</span><div><b>${escapeHtml(story.title)}</b><small>${escapeHtml(story.source || "来源待补")}${story.author ? ` · ${escapeHtml(story.author)}` : ""}</small></div></div>
      <span class="row-category">${escapeHtml(story.category)}</span><span class="source-state ${story.url && !story.authorized ? "warning" : ""}">${story.authorized ? "已记录授权" : story.url ? "链接已记 · 未授权" : "待补来源"}</span>
      <select class="status-select" data-status-story="${escapeHtml(story.id)}" aria-label="编辑状态">${["待筛选", "待核实", "准备写作", "草稿中", "已发布"].map((status) => `<option ${story.status === status ? "selected" : ""}>${status}</option>`).join("")}</select>
      <span class="row-date">${escapeHtml(story.date || "刚刚")}</span><button class="row-menu" data-delete-story="${escapeHtml(story.id)}" aria-label="删除线索">···</button>
    </div>`).join("") : `<div class="empty-state">还没有匹配的线索。换个筛选条件，或新建一条选题。</div>`;
}

function renderSources() {
  document.querySelector("#source-directory").innerHTML = sourceDirectory.map((group) => `
    <section class="source-group"><div class="source-group-head"><b>${escapeHtml(group.group)}</b><span>${escapeHtml(group.label)} · ${String(group.entries.length).padStart(2, "0")}</span></div>
    ${group.entries.map((source) => `<div class="source-row"><span class="source-badge">${escapeHtml(source.mark)}</span><div class="source-info"><b>${escapeHtml(source.name)}</b><small>${escapeHtml(source.desc)} · ${escapeHtml(source.feed)}</small></div><span class="source-actions"><span class="source-type-label">${escapeHtml(source.type)}</span><span class="rights-chip">仅作线索</span><a class="source-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener" aria-label="打开 ${escapeHtml(source.name)}">↗</a></span></div>`).join("")}</section>`).join("");
}

function renderDrafts() {
  const list = document.querySelector("#draft-list");
  list.innerHTML = state.drafts.length ? state.drafts.map((draft) => `<button class="draft-list-item ${draft.id === selectedDraftId ? "selected" : ""}" data-select-draft="${escapeHtml(draft.id)}"><b>${escapeHtml(draft.title || "未命名草稿")}</b><small><span>${escapeHtml(draft.updated || "刚刚")}</span><i>本机草稿</i></small></button>`).join("") : `<div class="empty-state">还没有草稿。</div>`;
  const draft = state.drafts.find((item) => item.id === selectedDraftId);
  const editor = document.querySelector("#draft-editor");
  if (!draft) {
    editor.innerHTML = `<div class="empty-state">先从左侧选择一篇草稿，或从选题线索新建。</div>`;
    return;
  }
  const story = state.stories.find((item) => item.id === draft.storyId);
  editor.innerHTML = `
    <div class="draft-editor-head"><div><span class="section-kicker">LOCAL DRAFT / 未发布</span><h2>公众号图文草稿</h2><small>最后编辑：${escapeHtml(draft.updated || "刚刚")}</small></div><button class="row-menu" data-delete-draft="${escapeHtml(draft.id)}" aria-label="删除草稿">···</button></div>
    <label class="editor-label" for="draft-title">文章标题</label><input class="draft-edit-title" id="draft-title" maxlength="64" value="${escapeHtml(draft.title)}" />
    <label class="editor-label" for="draft-body">原创摘要 / 正文</label><textarea class="draft-textarea" id="draft-body" placeholder="用自己的结构说明：发生了什么、跟卡村居民有什么关系、去哪看原始信息。">${escapeHtml(draft.body || "")}</textarea>
    <label class="editor-label">来源记录</label><div class="draft-source-row">${story ? `${escapeHtml(story.source || "来源待补")} · ${escapeHtml(story.author || "作者待确认")} · ${story.url ? `<a href="${escapeHtml(story.url)}" target="_blank" rel="noopener">打开原文 ↗</a>` : "原文链接待补"}` : "这是一篇独立草稿，请发布前补齐每条事实的来源。"}</div>
    <div class="draft-meta"><span>存于当前浏览器 · 发布前请手动核对授权、图片与链接</span><div class="draft-buttons"><button class="copy-button secondary" data-copy-draft="${escapeHtml(draft.id)}">复制排版稿</button><button class="copy-button" data-wechat-open>打开公众号后台 ↗</button></div></div>`;
  editor.querySelector("#draft-title").addEventListener("input", (event) => updateDraft(draft.id, { title: event.target.value }));
  editor.querySelector("#draft-body").addEventListener("input", (event) => updateDraft(draft.id, { body: event.target.value }));
}

function updateDraft(id, changes) {
  const draft = state.drafts.find((item) => item.id === id);
  if (!draft) return;
  Object.assign(draft, changes, { updated: "刚刚" });
  saveState();
  const current = document.querySelector(`.draft-list-item[data-select-draft="${CSS.escape(id)}"] b`);
  if (current && changes.title !== undefined) current.textContent = changes.title || "未命名草稿";
}

function openDraftForStory(storyId) {
  const story = state.stories.find((item) => item.id === storyId);
  if (!story) return;
  let draft = state.drafts.find((item) => item.storyId === storyId);
  if (!draft) {
    draft = { id: `draft-${Date.now()}`, storyId, title: story.title, updated: "刚刚", body: `${story.title}\n\n【编辑部摘要】\n用自己的话写清楚：发生了什么、卡村居民为什么值得关注、读者下一步可以做什么。不要复制原文结构或大段表达。\n\n【来源】${story.source || "待补"}${story.author ? ` · ${story.author}` : ""}\n${story.url || "原文链接待补"}` };
    state.drafts.unshift(draft);
  }
  selectedDraftId = draft.id;
  story.status = "草稿中";
  saveState();
  renderDrafts();
  switchView("drafts");
}

function switchView(name) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === `view-${name}`));
  document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  const nav = document.querySelector(`.nav-item[data-view="${name}"]`);
  document.querySelector("#breadcrumb-current").textContent = nav?.childNodes[1]?.textContent?.trim() || "卡村编辑台";
  if (name === "drafts") renderDrafts();
  if (name === "inbox") renderInbox();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  const element = document.createElement("div");
  element.className = "toast";
  element.textContent = message;
  document.body.append(element);
  window.setTimeout(() => element.remove(), 2400);
}

function exportBackup() {
  const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), version: 1, ...state }, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `kacun-editorial-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  toast("编辑台备份已导出");
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const backup = JSON.parse(reader.result);
      if (!Array.isArray(backup.stories) || !Array.isArray(backup.drafts)) throw new Error("文件格式不匹配");
      state = { stories: backup.stories, drafts: backup.drafts };
      selectedDraftId = state.drafts[0]?.id || "";
      saveState();
      renderAll();
      toast("备份已导入");
    } catch (error) { toast(`导入失败：${error.message}`); }
  };
  reader.readAsText(file);
}

function renderAll() { updateCounts(); renderHome(); renderInbox(); renderSources(); renderDrafts(); }

document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
document.querySelectorAll("[data-open-view]").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.openView)));
document.querySelector("#new-story-btn").addEventListener("click", () => document.querySelector("#story-dialog").showModal());
document.querySelector("#new-story-btn-2").addEventListener("click", () => document.querySelector("#story-dialog").showModal());
document.querySelector("#draft-new-btn").addEventListener("click", () => state.stories[0] ? openDraftForStory(state.stories[0].id) : toast("请先添加一条线索"));
document.querySelector("#export-btn").addEventListener("click", exportBackup);
document.querySelector("#import-btn").addEventListener("click", () => document.querySelector("#import-file").click());
document.querySelector("#import-file").addEventListener("change", (event) => { if (event.target.files[0]) importBackup(event.target.files[0]); event.target.value = ""; });
document.querySelector("#search-stories").addEventListener("input", renderInbox);
document.querySelectorAll("#inbox-filters button").forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll("#inbox-filters button").forEach((item) => item.classList.toggle("selected", item === button));
  renderInbox();
}));

document.addEventListener("click", async (event) => {
  const storyDraft = event.target.closest("[data-story-draft]");
  if (storyDraft) { event.stopPropagation(); openDraftForStory(storyDraft.dataset.storyDraft); return; }
  const sourcePill = event.target.closest("[data-source-url]");
  if (sourcePill) { window.open(sourcePill.dataset.sourceUrl, "_blank", "noopener"); return; }
  const selectDraft = event.target.closest("[data-select-draft]");
  if (selectDraft) { selectedDraftId = selectDraft.dataset.selectDraft; renderDrafts(); return; }
  const deleteStory = event.target.closest("[data-delete-story]");
  if (deleteStory) {
    state.stories = state.stories.filter((story) => story.id !== deleteStory.dataset.deleteStory);
    saveState(); renderAll(); toast("线索已删除"); return;
  }
  const deleteDraft = event.target.closest("[data-delete-draft]");
  if (deleteDraft) {
    state.drafts = state.drafts.filter((draft) => draft.id !== deleteDraft.dataset.deleteDraft);
    selectedDraftId = state.drafts[0]?.id || "";
    saveState(); renderDrafts(); toast("草稿已删除"); return;
  }
  const copyDraft = event.target.closest("[data-copy-draft]");
  if (copyDraft) {
    const draft = state.drafts.find((item) => item.id === copyDraft.dataset.copyDraft);
    const story = state.stories.find((item) => item.id === draft?.storyId);
    const sourceLine = story?.url ? `\n\n——\n来源：${story.source || "原文"}${story.author ? ` · 作者：${story.author}` : ""}\n${story.url}` : "\n\n——\n来源：请发布前补齐每条事实的原始出处与链接。";
    await navigator.clipboard.writeText(`${draft.title}\n\n${draft.body}${sourceLine}`);
    toast("排版稿已复制，可以粘贴到公众号草稿箱"); return;
  }
  if (event.target.closest("[data-wechat-open]")) window.open("https://mp.weixin.qq.com/", "_blank", "noopener");
});

document.addEventListener("change", (event) => {
  const select = event.target.closest("[data-status-story]");
  if (!select) return;
  const story = state.stories.find((item) => item.id === select.dataset.statusStory);
  if (story) { story.status = select.value; saveState(); renderAll(); toast("编辑状态已保存"); }
});

document.querySelector("#story-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const story = {
    id: `story-${Date.now()}`, title: String(values.get("title")).trim(), category: String(values.get("category")), status: String(values.get("status")),
    source: String(values.get("source") || "").trim(), url: String(values.get("url") || "").trim(), notes: String(values.get("notes") || "").trim(), author: "",
    date: "刚刚", authorized: values.get("authorized") === "on", excerpt: ""
  };
  state.stories.unshift(story);
  saveState(); renderAll(); form.reset(); document.querySelector("#story-dialog").close(); switchView("inbox"); toast("新线索已加入编辑队列");
});

document.querySelector("#today-date").textContent = new Intl.DateTimeFormat("zh-CN", { timeZone: "America/Edmonton", month: "2-digit", day: "2-digit", year: "numeric" }).format(new Date()).replaceAll("/", ".");
function updateCalgaryClock() { document.querySelector("#local-clock").textContent = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Edmonton", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()); }
updateCalgaryClock(); window.setInterval(updateCalgaryClock, 60000);
renderAll();
