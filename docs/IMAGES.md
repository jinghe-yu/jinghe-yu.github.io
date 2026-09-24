# 图片与公开文件

`public/` 中的文件会原样发布到网站，浏览器 URL 不包含 `public`。例如 `public/images/portrait/my-photo.jpg` 对应 `/images/portrait/my-photo.jpg`。

| 用途             | 存放位置                             | 修改入口                                              |
| ---------------- | ------------------------------------ | ----------------------------------------------------- |
| 左侧个人照片     | `public/images/portrait/`            | `src/data/site.ts` 的 `portrait.src`、`alt`           |
| 论文真实图片     | `public/images/research/<paper-id>/` | `src/data/publications.json` 的 `image`               |
| 公开 CV PDF      | `public/files/Jinghe-Yu-CV.pdf`      | `src/components/ProfileSidebar.astro` 的 View CV 链接 |
| 未公开的摄影原图 | `private/originals/`                 | 不在网页引用；该目录未加密                            |

目前左栏使用 `public/images/portrait/my-photo.jpg`。它是用户提供的 CHI 2026 活动照片，页面通过 CSS 裁切，源文件未被修改。将来换照片时，替换文件并检查 `portrait.alt` 是否准确；若文件名变化，也要同步修改 `portrait.src`。手机和桌面端都需预览一次裁切效果。

## 替换论文占位图

原始 Stitch 的 `stitch-preview.jpg` 是设计示意，并非已经核实的论文图。当前论文卡片对这类路径显示抽象图形占位，以免把通用素材误认为研究成果。准备好真实图片后：

1. 将文件放进 `public/images/research/<paper-id>/`，建议使用清晰的 PNG、WebP 或 JPEG。
2. 在 `src/data/publications.json` 中把该论文的 `image.src` 改成真实路径，并填写准确的 `alt`。
3. 运行 `npm run check` 和 `npm run build`，在浏览器检查桌面与手机端裁切。

`src/components/PublicationCard.astro` 会自动显示不以 `/stitch-preview.jpg` 结尾的真实图片；没有图片时仍显示抽象占位。不要上传未获公开许可的论文截图、参与者照片或敏感研究数据。

## 公开 CV 与其他照片

`CV/CV-Jinghe Yu.pdf` 是简历源文件；首页使用的是 `public/files/Jinghe-Yu-CV.pdf`。每次更新 CV 后，记得同步替换公开副本，再核对链接。该 PDF 含联系方式，会被所有访问者看到。

如需新增生活或会议照片，可放在 `public/images/life/`。旧版 `src/data/photos.ts` 和 `PhotoGallery.astro` 目前没有接到首页，新增文件本身不会自动展示；需要先在 `src/pages/index.astro` 接入照片区块。
