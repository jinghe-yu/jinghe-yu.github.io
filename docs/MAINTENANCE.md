# 日常维护与发布

## 更新内容

- 论文：编辑 `src/data/publications.json`。`group` 用 `published` 或 `submitted`，`categories` 可多选 `hci`、`health-wellbeing`、`affective`，分别对应 Human-Computer Interaction、AI for Health and Well-Being、Affective Computing。`tags` 填写从论文 PDF 内容核对出的 2–3 个具体研究主题或方法。每篇论文的 `id` 保持唯一且稳定。筛选器、分组数量和总数会自动计算。
- 论文顺序：编辑 `src/components/sections/Publications.astro` 中的 `preferredOrder`。新增论文时也将新 `id` 加入这里。正式状态必须与最新 CV 一致；投稿、在审不能写成已接收。
- 新闻、经历、教育、奖项：分别编辑 `src/components/sections/Updates.astro`、`Profile.astro`。News 目前不在前端渲染；内容仍保留在 `Updates.astro`，待信息核实后可在 `src/pages/index.astro` 与 `src/components/SiteHeader.astro` 恢复。新消息尽量给出具体月份和可核对的事实。
- 身份和联系方式：编辑 `src/data/site.ts`。左栏内容及 CV 按钮在 `src/components/ProfileSidebar.astro`。
- 章节与导航：`src/pages/index.astro` 决定章节顺序，`src/components/SiteHeader.astro` 决定 Tab；两者的 `id` 必须一致。滚动高亮逻辑位于 `src/scripts/navigation.ts`。
- 颜色和排版：改 `src/styles/global.css` 顶部的 CSS 变量；标题使用衬线字体，正文使用本地打包的 Inter，极小的标签使用 Space Mono。

论文卡片目前不展示 `summary` 字段，因为旧版部分摘要超出 CV 的已核实信息。数据仍保留供作者审阅。旧 Stitch 图片也暂不作为真实研究图显示；替换步骤见 [图片与文件指南](IMAGES.md)。

## 本地质量检查

```powershell
npm run check
npm run build
npm run dev
```

请特别检查桌面端左栏是否始终可见、手机端页面是否横向溢出、顶部 Tab 是否跳到对应章节、论文筛选是否更新数量、CV 和照片是否成功加载。减少动态效果设置下，重要内容应始终可见。

## 发布到 GitHub Pages

本项目使用 `.github/workflows/deploy.yml`，推送到 `main` 后构建并部署。当前仓库是 `jinghe-yu/jinghe-yu.github.io`，网站地址是 `https://jinghe-yu.github.io/`。确认改动和公开文件无误后：

```powershell
git add src public README.md docs
git commit -m "Refresh academic portfolio design"
git push
```

注意：`public/` 下的照片和 PDF 会公开。源 CV 在 `CV/` 中不会被 Astro 自动部署，但若将源 CV 提交到公开 GitHub 仓库，仓库访问者仍能看到它。提交前检查个人信息、图片版权和论文投稿状态。

`design/stitch-export/` 保存原始设计稿及资源清单；`private/originals/` 用于未公开原图。`node_modules/`、`.astro/`、`dist/` 为生成文件，不需手工修改。
