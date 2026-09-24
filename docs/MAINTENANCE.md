# 日常维护与部署

## 更新论文

编辑 `src/data/publications.json`，每个对象对应一张卡片，排列顺序就是组内显示顺序。

- `id`：唯一的小写英文、数字、连字符标识，建议新增后保持不变。
- `group`：`published` 或 `submitted`，前者包含已发表与已接收。
- `categories`：可以包含多个标签，支持 `hci`、`affective`、`healthcare`。
- `title`、`authors`、`venue`、`status`：正文。作者按顺序填写，共同贡献的 `*` 放在名字末尾。
- `role`、`award`、`summary`、`note`：可为空字符串。
- `links`：`{ "href": "https://...", "label": "Paper" }` 对象数组，没有链接时用 `[]`。
- `bibtex`：引用文本，没有正式引用时可设为 `""`，复制按钮会自动隐藏。
- `image`：图片配置，或 `null`。详见 `IMAGES.md`。
- `imageLabel`、`imageCaption`：图片上的标题与说明，可为空字符串。

新增时复制一个现有对象再修改，注意 JSON 对象之间的逗号。`publications.ts` 会检查重复 ID、分组、分类和关键字段。首页的论文数量、各分组数量与筛选结果会自动更新。

## 修改页面

`src/pages/index.astro` 只负责区块顺序；要调整文字或布局，进入 `src/components/sections/` 对应文件。所有论文共用 `PublicationCard.astro`，调整一次即可更新全部论文。

`site.ts` 控制联系方式和姓名；简介、课程、奖项、申请年份等较少变动的内容仍在对应区块中。这个分工避免把页面布局塞进 JSON，也避免将频繁新增的论文写死在模板中。

原 Tailwind CDN 已改为构建时编译。这里保留 Tailwind 3 的样式语义，与 Stitch 原稿一致；升级 Tailwind 大版本前应检查阴影、圆角、边框与响应式表现。

## 发布

```powershell
npm ci
npm run check
npm run build
npm run preview
```

GitHub Pages 的部署配置在 `.github/workflows/deploy.yml`。每次将改动推送到 `main` 分支，工作流会先检查代码，再构建并发布 `dist/`。其内容不包含 `private/`、`CV/`、设计参考和原始导出稿。

当前配置面向 `https://<username>.github.io/` 这个根路径。工作流在 GitHub 上构建时会用仓库所有者名称生成 Astro 的 `site`；仓库必须恰好命名为 `<username>.github.io`。若以后部署到普通仓库的 `/repository-name/` 子路径，还需设置 Astro `base` 并检查导航、PDF 与 JSON 中的本地链接。完整上传步骤见 `GITHUB_PAGES.md`。

## Git 与依赖

首次启用 Git 时，从项目根目录建立仓库，提交 `src/`、`public/`、配置、文档、原始设计参考和 `package-lock.json`。`.gitignore` 已排除依赖、构建产物、原始照片与环境变量。CV 含有个人联系方式；它保留在源代码目录中，不会自动发布到页面文件。

日常使用 `npm ci` 复现锁定依赖。更新依赖时应同时提交 `package.json` 与 `package-lock.json`。没有必要每次更新论文都升级构建工具。

## 本次迁移记录

- 原始 `code.html`、`DESIGN.md`、`screen.png` 已移动到 `design/stitch-export/`；移动前后 SHA-256 一致。`color-board.png` 位于 `design/`。
- 保留导出稿的 11 篇论文、6 条 BibTeX、作者顺序、正文、状态、链接与研究示意图。
- 页面默认展示全部论文，修复了导出时遗留的 HCI 筛选状态。移除了空白模拟器区块及其访问不存在控件的脚本。
- 图片具有真实 `alt` 属性；字体改为本地依赖；论文筛选、复制失败提示和减少动态效果设置有独立实现。
- `scripts/migrate-stitch.mjs` 和 `scripts/localize-stitch-images.mjs` 仅记录迁移过程，日常维护不需要执行；不要用新的 Stitch 导出覆盖已维护的 `src/`。

### 导出稿本身的内容差异

这次整理以保留导出稿为原则，没有核验论文摘要或引用信息。实际文件中有以下内容需要作者在正式发布前确定：

- 原 HTML 标题使用“于景和”，正文和页脚使用“余静荷”。新站点保留正文中文名，页面标题使用英文名，可在 `site.ts` 修改。
- 导出稿的论文摘要和研究示意图比原 CV 包含更多具体表述。尤其 `mental-health.astro` 的 **92.4% / 58.1%** 数值来自 Stitch，CV 没有这些数据，应换成真实证据或删除该示意图。
- 原 Google 配图存在跨项目复用，已保存到本地 `public/images/research/`，应作为设计占位。BibTeX 也直接取自导出稿。

这些差异已集中记录，便于下一轮内容审阅。
