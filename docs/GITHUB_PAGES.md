# 把网站发布到 `用户名.github.io`

本项目已包含 `.github/workflows/deploy.yml`。第一次上传后，GitHub Actions 会自动检查、构建、发布；以后每次推送到 `main` 都会自动更新网站。

## 1. 确认 GitHub 用户名并建立仓库

登录 https://github.com，点击右上角 **+ → New repository**。

- **Owner**：选择你自己的账号。
- **Repository name**：精确填写 `<你的用户名>.github.io`。例如 GitHub 用户名是 `jingheyu`，仓库名就是 `jingheyu.github.io`。
- **Visibility**：如使用 GitHub Free，选 **Public**。
- 建议**不要在网页上预先勾选添加 README、.gitignore 或 License**；本地项目已带有这些文件中的前两项，这样首次推送不会遇到额外合并步骤。

点击 **Create repository**。这里的 `<你的用户名>` 只是占位符，必须替换为你在 GitHub 个人主页 URL 中看到的真实用户名。`github.io` 是 GitHub Pages 免费提供的站点地址，无需另外购买域名。GitHub 的用户站点仓库命名规则见 [官方文档](https://docs.github.com/en/pages/quickstart)。

## 2. 在本机上传源码

本目录已初始化 Git 且有初始提交。打开 PowerShell：

```powershell
cd 'C:\Users\yu_da\Desktop\My Websitie'
git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
git push -u origin main
```

逐处替换 `<你的用户名>`，例如 `git remote add origin https://github.com/jingheyu/jingheyu.github.io.git`。`git push` 首次运行时，Git Credential Manager 可能打开浏览器让你登录 GitHub；按提示完成即可。**不要把密码、访问令牌写在命令或配置文件里。**

若显示 `remote origin already exists`，先用 `git remote -v` 检查现有地址，再用 `git remote set-url origin https://github.com/<你的用户名>/<你的用户名>.github.io.git` 修改。若出现 `non-fast-forward`，说明远端已有提交（通常是创建仓库时预先添加了 README）；此时不要强推，先检查远端内容并正常合并。

也可以使用 GitHub Desktop：选择 **File → Add local repository**，选本项目文件夹，再选择 **Publish repository**，名称填写 `<你的用户名>.github.io`。确认实际上传的是项目根目录，仓库中能看到 `package.json` 与 `.github/workflows/deploy.yml`。

## 3. 在 GitHub 开启 Pages

进入新仓库的 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。然后进入 **Actions** 标签，查看 **Deploy to GitHub Pages** 工作流。若第一次上传时 Pages 尚未启用，可在该工作流页面点 **Run workflow** 手动重跑。

工作流 `build`、`deploy` 均成功后，页面地址是：

```text
https://<你的用户名>.github.io/
```

GitHub 的 Pages 设置与自定义工作流步骤见 [官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)。项目使用的 Astro Action 也是 [Astro 官方推荐方式](https://docs.astro.build/en/guides/deploy/github/)。

## 4. 以后怎样更新

在本机修改 `src/` 或 `public/`，运行 `npm run check` 与 `npm run build`，然后：

```powershell
git add .
git commit -m "Update portfolio"
git push
```

几分钟后去 **Actions** 看本次部署状态，成功后刷新网站。构建产物 `dist/` 已由 `.gitignore` 排除，GitHub Actions 会重新构建，无需手动上传这个文件夹。

## 发布前的内容确认

本地代码和公开网站包含邮箱与手机号（来自你的原始 CV）。`private/originals/`、`node_modules/`、`dist/` 已排除在 Git 提交之外；本次没有替你发布个人照片。导出稿中的中文姓名不一致、研究百分比与 CV 不完全一致的地方，已列在 `MAINTENANCE.md`，建议正式对外分享前检查。

当前电脑没有安装 `gh` 命令，也未识别到本项目现成的 GitHub 远端或账号，因此需要你使用自己的 GitHub 用户名建立仓库并完成第一次推送。以上流程不需要 `gh` 命令。
