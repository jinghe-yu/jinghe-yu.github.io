# 图片与公开文件

`public/` 中的文件会原样发布到网站，浏览器 URL 不包含 `public`。例如 `public/images/portrait/my-photo.jpg` 对应 `/images/portrait/my-photo.jpg`。

| 用途               | 存放位置                        | 修改入口                                              |
| ------------------ | ------------------------------- | ----------------------------------------------------- |
| 左侧个人照片       | `public/images/portrait/`       | `src/data/site.ts` 的 `portrait.src`、`alt`           |
| 论文图片与公开 PDF | `public/research/<paper-id>/`   | `src/data/publications.json` 的 `image`、`links`      |
| 公开 CV PDF        | `public/files/Jinghe-Yu-CV.pdf` | `src/components/ProfileSidebar.astro` 的 View CV 链接 |
| 未公开的摄影原图   | `private/originals/`            | 不在网页引用；该目录未加密                            |

目前左栏使用 `public/images/portrait/my-photo.jpg`。它是用户提供的 CHI 2026 活动照片，页面通过 CSS 裁切，源文件未被修改。将来换照片时，替换文件并检查 `portrait.alt` 是否准确；若文件名变化，也要同步修改 `portrait.src`。手机和桌面端都需预览一次裁切效果。

## 论文资料：每篇论文一个文件夹

原始 Stitch 的 `stitch-preview.jpg` 是设计示意，并非已经核实的论文图。现在 11 篇论文都有真实配图。每篇论文用稳定的 `paper-id` 建一个目录，例如：

```text
public/research/emotype26/
  figure.png
  paper.pdf
```

静态图统一命名 `figure.png`，动态图命名 `preview.gif`，论文全文命名 `paper.pdf`。目前 11 篇论文的 PDF 均已放在各自目录中。题目、作者、状态、Abstract、链接与展示顺序仍统一维护在 `src/data/publications.json`，不按学科类型拆分，因为同一篇论文可能跨越多个领域。配图以完整呈现为优先，不裁切内容；点击配图可在新标签页查看原图。

更新资料时：

1. 将已确认可公开的图片、GIF 或 PDF 放进对应 `public/research/<paper-id>/`。
2. 在 `src/data/publications.json` 中设置该论文的 `image.src`、准确的 `alt` 和图片原始 `width`、`height`；将 PDF 原文的完整摘要填入 `abstract`。PDF 链接放在 `links` 数组中，`label` 设为 `PDF`；Demo 视频链接的 `label` 设为 `Demo`。
3. 运行 `npm run check` 和 `npm run build`，在浏览器检查桌面与手机端的图片比例、Abstract 展开收起，以及 PDF、Demo 链接。

`src/components/PublicationCard.astro` 会显示真实配图。`public/` 内的文件会原样发布，即使没有显示链接也可能通过 URL 访问。投稿或审稿中的 PDF，须确认投稿政策和所有合作者同意后才能放进这里；不要上传未获公开许可的论文截图、参与者照片或敏感研究数据。

## 公开 CV 与其他照片

`CV/CV-Jinghe Yu.pdf` 是简历源文件；首页使用的是 `public/files/Jinghe-Yu-CV.pdf`。每次更新 CV 后，记得同步替换公开副本，再核对链接。该 PDF 含联系方式，会被所有访问者看到。

如需新增生活或会议照片，可放在 `public/images/life/`。旧版 `src/data/photos.ts` 和 `PhotoGallery.astro` 目前没有接到首页，新增文件本身不会自动展示；需要先在 `src/pages/index.astro` 接入照片区块。
