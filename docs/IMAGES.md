# 图片存放与接入指南

## 图片应该放在哪里

| 图片用途               | 实际文件夹                            | 文件名示例         | 网页引用路径                                  |
| ---------------------- | ------------------------------------- | ------------------ | --------------------------------------------- |
| 头像 / 半身照          | `public/images/portrait/`             | `jinghe-yu.webp`   | `/images/portrait/jinghe-yu.webp`             |
| 校园 / 生活 / 会议照片 | `public/images/life/`                 | `2026-campus.webp` | `/images/life/2026-campus.webp`               |
| 论文或项目配图         | `public/images/research/emomirror26/` | `interface.webp`   | `/images/research/emomirror26/interface.webp` |
| 公开 PDF               | `public/documents/`                   | `jinghe-yu-cv.pdf` | `/documents/jinghe-yu-cv.pdf`                 |
| 相机原图、未裁剪版本   | `private/originals/`                  | 任意原文件名       | 不在网页引用                                  |

研究目录名称使用 `src/data/publications.json` 中对应论文的 `id`。现有 11 个项目都有预留目录。`public/` 内的内容会进入发布文件夹，原图放在 `private/originals/`。该目录只是通过构建目录和 Git 忽略规则隔离，并非加密存储。

网页路径从 `/images/` 开始，**不要包含 `public`，不要使用 Windows 磁盘路径，也不要使用反斜杠**。

## 添加个人头像

1. 选一张照片，裁成接近 **4:5** 的半身肖像，例如 800 × 1000 像素。
2. 保存为 `public/images/portrait/jinghe-yu.webp`。也支持 `.jpg`、`.png`，但配置中的扩展名必须一致。
3. 打开 `src/data/site.ts`，修改 `portrait`：

```ts
portrait: {
  src: '/images/portrait/jinghe-yu.webp',
  alt: 'Portrait of Jinghe Yu',
  width: 800,
  height: 1000,
  objectPosition: '50% 35%',
},
```

头像会出现在首页右侧研究兴趣卡片顶部。`objectPosition` 控制裁剪中心；脸部偏上时可用 `50% 25%`。暂时不显示头像时，将 `src` 设为 `''`。照片位置已接入页面，无需另外修改 HTML。

## 添加生活照片

把图片放入 `public/images/life/`，然后编辑 `src/data/photos.ts`：

```ts
export const photos: Photo[] = [
  {
    src: "/images/life/2026-campus.webp",
    alt: "Jinghe walking on the SCUT campus",
    caption: "An afternoon on campus.",
    width: 1600,
    height: 1200,
    objectPosition: "center",
  },
];
```

将示例说明改成实际照片内容。页面底部的 **Beyond Research** 照片墙会自动显示；数组为空时整段隐藏。照片顺序与数组顺序一致，显示裁剪比例为 4:3。

## 替换论文配图

例如给 EmoMirror 添加真实界面截图：

1. 放入 `public/images/research/emomirror26/interface.webp`。
2. 在 `src/data/publications.json` 中找到 `"id": "emomirror26"`，修改：

```json
"image": {
  "src": "/images/research/emomirror26/interface.webp",
  "alt": "EmoMirror interface with the emotion reflection view open",
  "objectPosition": "center"
},
"imageLabel": "EmoMirror",
"imageCaption": "Emotion reflection interface"
```

原来使用示意图的论文，也可以填入相同结构的 `image`，系统会优先显示你提供的真实图片。当前图片卡片固定高度并采用 `object-cover` 裁剪；如需要完整显示论文系统图，可在 `src/components/PublicationVisual.astro` 中将 `object-cover` 改为 `object-contain`，并根据需要关闭覆盖在图片底部的说明。

导出稿的 6 张配图已保存在各自的 `public/images/research/<paper-id>/stitch-preview.jpg`。其中部分图片被多个项目复用，属于设计占位素材；建议逐步换成真实论文截图。原始外链与现有本地路径保存在 `design/stitch-export/asset-manifest.json`。

## 图片规格

- 文件名使用小写英文、数字和连字符，如 `2026-chi-presentation.webp`。
- 照片建议 WebP 或 JPEG；透明图或需要无损文字细节的界面截图可以使用 PNG；图标与线性图优先 SVG。
- 头像建议 800–1200 像素高、约 150–300 KB；其他照片长边 1200–1800 像素、约 200–500 KB。这是建议值，不是程序限制。
- 本项目的 `public/` 图片会原样发布，**不会自动压缩**。先裁剪、压缩，再放进公开目录。
- `alt` 描述图片内容，`caption` 是页面上可见的说明。保留真实人物照片的原图时，可在导出网页版本时去除不需要公开的 EXIF 定位信息。

添加后运行 `npm run build`。不存在的本地图片路径会让构建报错，便于上线前发现文件名拼写或扩展名不一致。
