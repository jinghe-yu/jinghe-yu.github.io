# Jinghe Yu · Academic Website

以 Astro 构建的静态学术个人网站。桌面端左侧为固定的个人信息栏，右侧按章节纵向阅读；手机端改为顶部简介和可横向滑动的章节导航。页面使用本地字体、少量原生 JavaScript，以及尊重 `prefers-reduced-motion` 的轻量动效。

## 本地预览

需要 Node.js 22.12 或更新版本。

```powershell
npm ci
npm run dev
```

打开终端显示的地址（通常为 `http://127.0.0.1:4321/`）。上线前运行：

```powershell
npm run check
npm run build
```

## 内容和设计在哪里修改

| 内容                       | 文件                                      |
| -------------------------- | ----------------------------------------- |
| 姓名、邮箱、照片路径、SEO  | `src/data/site.ts`                        |
| 论文作者、状态、链接、图片 | `src/data/publications.json`              |
| 简介                       | `src/components/sections/Hero.astro`      |
| 新闻动态                   | `src/components/sections/Updates.astro`   |
| 研究兴趣                   | `src/components/sections/Expertise.astro` |
| 经历、教育、荣誉           | `src/components/sections/Profile.astro`   |
| 章节顺序                   | `src/pages/index.astro`                   |
| 顶部 Tab                   | `src/components/SiteHeader.astro`         |
| 左侧个人信息栏             | `src/components/ProfileSidebar.astro`     |
| 色彩、排版、动效、响应式   | `src/styles/global.css`                   |
| Tab 高亮与滚动动画         | `src/scripts/navigation.ts`               |

论文筛选与 BibTeX 复制在 `src/scripts/publications.ts`。更新论文数量无需手动修改页面数字。`src/components/sections/PhotoGallery.astro`、`src/components/PublicationVisual.astro` 等旧版组件保留作参考，当前首页并未使用。

照片和公开 PDF 的放置方式见 [图片与文件指南](docs/IMAGES.md)；更新与部署流程见 [维护说明](docs/MAINTENANCE.md) 和 [GitHub Pages 指南](docs/GITHUB_PAGES.md)。原始 Stitch 导出保留在 `design/stitch-export/`，不要用新导出直接覆盖 `src/`。
