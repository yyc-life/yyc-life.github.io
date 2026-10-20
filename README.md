# 卡村 KACUN · Calgary 本地生活编辑台

一个纯静态、可部署到 GitHub Pages 的中文编辑工作台原型，面向卡尔加里本地资讯、吃喝玩乐和生活攻略。

## 当前功能

- 今日编辑台：选题卡片、内容进度和编辑流程。
- 选题线索：新增、筛选、搜索、编辑状态、删除，记录来源链接与转载授权状态。
- 公众号草稿：编辑标题与正文、关联来源、复制排版稿、打开公众号后台。
- 资讯来源：官方公告、本地新闻、吃喝玩乐与活动来源目录。
- 转载与发布：授权核对清单和从发现到公众号草稿的人工流程。
- JSON 备份：导入 / 导出线索和草稿。

## 本机数据与限制

这是 GitHub Pages 静态站点，没有服务器、登录或团队同步。内容保存在当前浏览器的 `localStorage` 中；清理浏览器数据前请导出 JSON 备份。换电脑或浏览器时可导入备份。请勿在共享或公共设备保存敏感编辑资料。

RSS 和来源链接目前用于人工发现线索。浏览器端跨域限制、来源站条款和版权许可都使“把 RSS 接进网页并自动复制全文”不适合作为发布流程。未来如需自动同步、多人协作和权限管理，需要另加后端或内容管理服务。

## 本地预览

直接打开 `index.html`，或在仓库根目录运行：

```sh
python -m http.server 8000
```

然后打开 `http://localhost:8000`。

## 发布到 GitHub Pages

仓库应为 `yyc-life/yyc-life.github.io`，并使用 `main` 分支作为默认分支。本仓库附带 GitHub Actions 工作流：推送到 `main` 后会构建静态 artifact 并部署 Pages。首次启用时，在 GitHub 仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。工作流完成后网址为 <https://yyc-life.github.io/>。

GitHub Organization 简介建议：

- Name：卡村 KACUN
- Description：Calgary 不无聊！发现卡村好吃的、好玩的、新鲜事。年轻人的 Calgary 本地生活指南。
- Location：Calgary, Alberta, Canada
- Website：<https://yyc-life.github.io/>

## 公众号内容工作流

推荐固定做成「一周 YYC」：本地新鲜事 2 条、活动/周末去处 2 条、吃喝或生活攻略 1 条。每条用原创中文结构说明事实、对卡城居民的影响和下一步信息，并列原始来源、作者（若来源提供）、日期与链接。

RSS 订阅或浏览新闻只代表发现、跟踪内容，不代表获得转载许可。完整转载、翻译、配图或视频，应先取得对应权利方的明确书面授权并保存范围。来源署名本身不自动等于授权；未经许可时应避免复制全文和媒体图片，写独立摘要与评论，并链接原文。加拿大《Copyright Act》s.29.2 对新闻报道目的 fair dealing 有来源及作者标注条件，但具体是否适用取决于事实，不应理解为整篇转载的通行许可。

如转载另一家微信公众号标注「原创」的文章，向原账号申请其公众号平台的转载授权/白名单；这类授权不替代外部加拿大媒体的授权。进入公众号后台后，把草稿粘贴到新建图文，逐项核对标题、来源链接、图片许可和手机预览，再由运营者手动群发。本编辑台不会替用户登录或发布。

## 资讯来源

| 来源 | 适合关注 | 发现方式 |
|---|---|---|
| [City of Calgary Newsroom](https://newsroom.calgary.ca/en/) | 市政服务、工程、政策、官方公告 | 新闻稿与 Feature RSS |
| [CBC Calgary](https://www.cbc.ca/news/canada/calgary) | 城市新闻、社区、交通 | `https://www.cbc.ca/webfeed/rss/rss-canada-calgary` |
| [Global News Calgary](https://globalnews.ca/calgary/) | 本地新闻、消费提醒 | [官方 RSS 目录](https://globalnews.ca/pages/feeds/)；Calgary feed `https://globalnews.ca/calgary/feed/` |
| [Calgary Police News Releases](https://newsroom.calgary.ca/police-news-releases/) | 警方公告、安全提醒 | City Newsroom 分类页 |
| [Calgary Transit](https://www.calgarytransit.com/content/transit/en/home/service-updates.html) | 公交服务与出行 | 服务更新页 |
| [卡尔加里微生活（微信号 canadawelife）](https://weixin.sogou.com/weixin?type=1&query=canadawelife) | 华人社区资讯、生活内容 | 微信内搜索账号名；现存公开资料可佐证账号名，但活跃状态及转载授权需逐篇核实；暂无可验证 RSS |
| [Parks Canada — Banff](https://parks.canada.ca/pn-np/ab/banff) | 户外安全、公园与季节信息 | 官方更新 |
| [Avenue Calgary](https://www.avenuecalgary.com/) | 餐厅、新店、美食与城市生活 | 邮件通讯；RSS 链接需要再核实 |
| [YYC Current](https://yyccurrent.ca/) | 演出、喜剧、市集、户外与社区活动 | 每周邮件、活动日历与 RSS；数据/API 复用另需确认 |
| [Tourism Calgary Events](https://www.visitcalgary.com/events) | 节庆、展览和访客活动 | 活动日历 |
| [LiveWire Calgary](https://livewirecalgary.com/newsletter/) | 本地社区和城市发展 | 邮件通讯 |
| [Calgary Citizen](https://calgarycitizen.com/subscribe) | 市政、商业、美食和文化 | 每周邮件通讯 |
| [Calgary Herald](https://calgaryherald.com/) | 本地新闻、商业与文化 | 网站；部分内容付费，RSS 端点待复核 |
| [CTV News Calgary](https://calgary.ctvnews.ca/) | 南艾省本地新闻 | 网站；RSS 端点待复核 |
| [Calgary Public Library Events](https://www.calgarylibrary.ca/events-and-programs/programs) | 免费活动、讲座和工作坊 | 活动日历 |

部分 Feed 地址和活动数据许可会变化；接入自动更新前，请再次确认来源网站的当前 Feed、服务条款和授权状态。
