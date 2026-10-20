# 卡村 KACUN — Calgary 新鲜资讯

这是面向读者的卡尔加里公众号主页式资讯流，不是编辑后台。首页展示卡村 KACUN 的账号资料，并按日期分组呈现头条和文章列表；点击文章进入公众号风格的长文阅读页。AI 代理查看公开新闻与生活来源、用中文整理新消息、补上原始来源和核对时间，再更新 `articles.json`。每篇文章可通过 `?article=文章ID` 直接打开。提交到 `main` 后，GitHub Actions 自动发布到 [https://yyc-life.github.io/](https://yyc-life.github.io/)。

## 内容发布规则

- 每篇都写独立、简短的中文摘要，说明对卡尔加里居民有什么用；每篇尽量显示原文来源卡片，卡片直接链接到原文。
- 原文卡片使用来源页面提供的标题和相关预览图（如页面有合适的 `og:image` 或媒体预览），图片只在卡片里远程显示并链接回原文；不下载、不截图、不复制到仓库。不要把来源方的通用 Logo、广告或无关图片当成文章配图。来源页没有合适预览图时显示纯文字来源卡片，不补生成式图片。
- 外站禁止 iframe 时，不嵌入整页；用来源标题、发布方和预览图制作可点击的嵌入式卡片。每篇在 `sourceEmbed` 记录 `url`、`title`、`publisher`、`thumbnail`（没有则为 `null`）和 `thumbnailAlt`；`imageAttempt` 记录检查日期、卡片/纯文字状态与原因。
- 保留原始标题对应的来源链接、发布方、原文日期和卡村核对日期。涉及交通、健康、安全、价格或活动时间时，发布前回到原始页面复核。
- 未获权利方明确许可时，只发事实摘要和来源链接。整篇转载、译文和图片分别确认授权；注明来源本身不等于获得转载许可。
- 资讯源包括 [卡尔加里市府](https://newsroom.calgary.ca/en/)、[警方](https://newsroom.calgary.ca/police-news-releases/)、[Calgary Transit](https://www.calgarytransit.com/content/transit/en/home/service-updates.html)、[CBC](https://www.cbc.ca/news/canada/calgary)、[Global News](https://globalnews.ca/calgary/)、[CTV](https://calgary.ctvnews.ca/)、[Calgary Herald](https://calgaryherald.com/)、[LiveWire](https://livewirecalgary.com/)、[Calgary Citizen](https://calgarycitizen.com/subscribe)、[Avenue Calgary](https://www.avenuecalgary.com/)、[YYC Current](https://yyccurrent.ca/)、[Tourism Calgary](https://www.visitcalgary.com/events)、[Calgary Public Library](https://www.calgarylibrary.ca/events-and-programs/programs)，以及华人公众号“卡尔加里微生活”（历史公开资料列出的微信号 `canadawelife`）和“卡尔加里吃喝玩乐”（历史公开资料列出的微信号 `fanta7kaerjiali`）。两个公众号的当前活跃状态需在微信内确认。
- 每天另查当天晚上和未来几天的约会/出门灵感，优先面向卡尔加里华人读者筛选：中文/亚洲文化活动、中文歌单 KTV、华人社区活动、中餐/亚洲美食体验、夜市，以及马术、体育、展览等低语言门槛的现场活动。英文脱口秀或依赖大量英语交流的活动不作为默认推荐；确有特色时标清演出语言。优先核对场馆/主办方页面的日期、时间、地点、年龄限制、票价与余票；写清楚“全天”并不代表晚上有场次。适合的活动放入 `约会灵感` 内容，至少给出几个风格不同的选择及每项对应的主办方或购票链接；活动过期后及时移除。
- 有重大安全或健康提醒时，标注为官方公告并引导读者查看原文最新状态；无法核实时先不发布。

## 更新文章

由 AI 代理采编时，只编辑 `articles.json` 的 `updatedAt`、`updatedLabel` 和 `articles`。每条记录包含：

`id`, `date`, `dateLabel`, `sourceDate`, `verifiedAt`, `category`, `title`, `summary`, `deck`, `lede`, `sections`, `takeaway`, `sourceType`, `source`, `author`, `url`, `sourceEmbed`, `imageAttempt`

长文结构使用 `deck`（标题下的一句话导读）、`lede`（开篇导语）和 `sections`。每个 section 包含一个 `heading`、若干原创 `paragraphs`，必要时可加 `bullets` 和 `links`（每项包含 `label`、`url`，在文章里显示成原始来源链接）。标题后标明“卡村 KACUN · AI 资讯整理”、来源及原文日期；正文用自然短段落和清晰小标题推进，最后给出实用要点和可点开的原文卡片。`sourceEmbed` 保存原文 URL、原文标题、发布方、预览图 URL（没有合适图片时为 `null`）和图片说明。`imageAttempt` 每篇必填，记录 `status`、`checkedAt` 和选择卡片或纯文字卡片的原因。不要生成虚构新闻照片、截图或复制原文图片，不要冒充来源方或重复导读内容。版面参考微信公众号的窄栏阅读、作者时间、段落节奏和重点提示，但不复制来源文章的文字、图片或视觉品牌。

分类使用 `本地资讯`、`生活提醒`、`吃喝玩乐`、`周末去哪`、`约会灵感`。按核对与发布时间将最新文章排在 `articles[0]`；保留仍有用的旧文，移除过期活动和失效提醒。`app.js` 根据日期分组生成账号主页资讯流，并生成独立长文阅读页；站点不提供浏览器端编辑功能。

## 微信公众号

网站上的中文摘要可以作为独立资讯内容的基础，转到公众号前应再核对事实和链接，明确标注原始媒体/发布方及原文地址。需要整篇转载或使用原图时，先拿到适用于该平台的书面授权；公众号白名单只解决公众号平台内的转载授权，不覆盖加拿大新闻媒体等外部权利方。

GitHub Pages 由 `.github/workflows/pages.yml` 部署。每日采编代理读取来源、独立撰写长文并更新数据后提交部署；站点是静态读者页面，不保存读者数据，也没有供人工编辑的内容管理后台。
