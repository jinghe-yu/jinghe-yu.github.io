# Jinghe Yu · Personal Academic Website

这是从 Google Stitch 初稿整理出的可长期维护的网站。技术栈是 **Astro 静态页面 + TypeScript + Tailwind CSS**。页面在构建时生成 HTML；浏览器只运行论文筛选和引用复制所需的少量 JavaScript。字体随网站本地打包。

## 本地运行

需要 Node.js 22.12+，推荐 Node.js 24 LTS（本项目使用的版本）。在当前项目根目录打开终端：

```powershell
npm ci
npm run dev
```

打开终端显示的地址，通常是 `http://localhost:4321`。依赖已安装时，日常只需 `npm run dev`；修改源码后页面会自动更新。不要通过双击归档的 `code.html` 预览新站点。

```powershell
npm run check    # TypeScript / Astro 检查
npm run build    # 生成 dist/ 中可部署的静态网站
npm run preview  # 在本地预览构建结果
npm run format   # 统一源码和文档格式
```

## 项目结构

```text
My Websitie/
├── src/
│   ├── pages/index.astro            # 首页各区块的排列顺序
│   ├── layouts/BaseLayout.astro     # 标题、SEO、字体、全局样式
│   ├── components/
│   │   ├── SiteHeader.astro         # 页头与导航
│   │   ├── SiteFooter.astro         # 页脚
│   │   ├── PublicationCard.astro    # 所有论文共用的卡片
│   │   ├── PublicationVisual.astro  # 论文配图 / 原始示意图切换
│   │   ├── sections/               # 简介、论文、技能、履历、照片墙
│   │   ├── media/Portrait.astro     # 可选头像展示
│   │   └── research-visuals/        # 从 Stitch 保留的 5 个研究示意图
│   ├── data/
│   │   ├── site.ts                 # 姓名、联系方式、头像、SEO 文案
│   │   ├── publications.json       # 论文内容、作者、状态、链接、配图
│   │   ├── publications.ts         # 论文分类和基本内容校验
│   │   ├── photos.ts               # 生活照及其说明
│   │   └── types.ts                # 数据结构定义
│   ├── styles/global.css           # 交互样式、全局样式、减少动态效果
│   ├── scripts/publications.ts     # 筛选与 BibTeX 复制交互
│   └── lib/media.ts                # 构建时检查本地图片路径
├── public/                         # 会原样发布到网站的文件
│   ├── images/
│   │   ├── portrait/               # 个人头像
│   │   ├── life/                   # 生活、会议、校园照片
│   │   └── research/<paper-id>/     # 每篇论文 / 项目的图片
│   └── documents/                  # 准备公开的 CV PDF 等
├── private/originals/              # 摄影原图，不构建、不提交 Git
├── CV/                             # 原有 LaTeX 与 Markdown 简历源文件
├── design/
│   ├── color-board.png             # 原有配色参考
│   └── stitch-export/              # 原始 HTML、设计说明、截图和资源清单
├── docs/IMAGES.md                   # 如何放入和使用图片
├── docs/MAINTENANCE.md              # 更新论文、修改页面、部署说明
├── scripts/                        # 一次性迁移脚本，不用于日常维护
├── tailwind.config.mjs              # 颜色、字体等设计参数
├── astro.config.mjs                 # 网站构建配置与未来域名配置
├── package.json                    # 运行命令与依赖
└── package-lock.json               # 依赖锁定版本，应提交 Git
```

`node_modules/`、`.astro/`、`dist/` 是自动生成目录，不手工修改，也不提交 Git。原 `stitch_human_centered_ai_portfolio/` 留有指向新位置的说明。

## 常用修改入口

| 要修改什么                       | 编辑哪里                                                              |
| -------------------------------- | --------------------------------------------------------------------- |
| 姓名、邮箱、电话、头像           | `src/data/site.ts`                                                    |
| 新增论文、更新状态、替换研究配图 | `src/data/publications.json`                                          |
| 增加生活照片                     | `src/data/photos.ts`                                                  |
| 自我介绍与研究兴趣               | `src/components/sections/Hero.astro`                                  |
| 学校、经历、课程、奖项           | `src/components/sections/Profile.astro`                               |
| 技术与研究技能                   | `src/components/sections/Expertise.astro`                             |
| 导航、申请时间提示               | `SiteHeader.astro`、`SiteFooter.astro`、`Hero.astro`、`Profile.astro` |
| 颜色与字体                       | `tailwind.config.mjs`                                                 |
| 动效与全局样式                   | `src/styles/global.css`                                               |

论文总数和分组数量由数据自动计算，无需在多个位置修改。原始 CV 作为内容参考保留，**修改 CV 不会自动同步到网页**；网页显示以 `src/` 为准。

先阅读 [图片使用指南](docs/IMAGES.md) 和 [GitHub Pages 上传指南](docs/GITHUB_PAGES.md)，日常更新可查阅 [维护说明](docs/MAINTENANCE.md)。
