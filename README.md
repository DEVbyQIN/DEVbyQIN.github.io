# Qin's Space

个人综合主页初版。Astro 7 + Tailwind CSS 4 + TypeScript，静态生成，面向 `https://devbyqin.github.io/` 配置。

当前完成首页、项目列表与详情、文章、笔记、双缝干涉演示、关于和 404 页面，支持深浅色主题、手机导航、Markdown / MDX、KaTeX 公式、代码高亮和文章目录。

## 本地预览

需要 Node.js ≥ 22.23.4，本项目使用 Node.js 24.22.2（见 `.nvmrc`）。

```bash
nvm use
npm ci
npm run dev
```

打开终端显示的本地网址，通常是 `http://127.0.0.1:4321/`。

```bash
npm run build
npm run check:links
npm run preview
```

`build` 会先运行 Astro / TypeScript 检查，再生成 `dist/`。链接检查覆盖生成页面内的本地地址、图片、样式与目录锚点。预览服务器仅在本机监听。

若在受限环境中 Astro 无法写入系统偏好目录，可以在命令前加 `ASTRO_TELEMETRY_DISABLED=1`。这只关闭 Astro 遥测，不影响网站。

## 发布到 GitHub Pages

本地源码和部署工作流已经准备好；仓库建立、代码推送和远程部署是否完成，以实际 GitHub 状态为准。

1. 在 GitHub 建立公开、空白仓库 **`DEVbyQIN.github.io`**。不要预先生成 README、许可证或 `.gitignore`。
2. 在当前项目目录提交并推送：

   ```bash
   git add .
   git commit -m "Build Qin's Space personal website"
   git remote add origin https://github.com/DEVbyQIN/DEVbyQIN.github.io.git
   git push -u origin main
   ```

   如果已有本地提交，跳过 `git commit`；如果已经设置 `origin`，先用 `git remote -v` 确认地址，避免重复添加。

3. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 打开 **Actions → Deploy to GitHub Pages**，确认 build 和 deploy 都成功。若第一次运行发生在 Pages 启用前，启用后从 **Run workflow** 再运行一次。
5. 发布成功后的地址为 `https://devbyqin.github.io/`。后续推送 `main` 会自动更新。

工作流按 [Astro 官方 GitHub Pages 部署文档](https://docs.astro.build/en/guides/deploy/github/) 配置，提交 `package-lock.json` 后可以固定依赖。专用用户主页仓库不需要 `base`，本站内部地址按根路径配置；不要直接用其他名称的项目仓库发布而不调整路径。

## 修改资料与内容

| 内容 | 位置 |
| --- | --- |
| 站点名称、GitHub、项目资料 | `src/data/site.ts` |
| 自我介绍 | `src/pages/about.astro` |
| 首页文案 | `src/pages/index.astro` |
| 颜色、字体、布局 | `src/styles/global.css` |
| 文章和笔记 | `src/content/writing/` |
| 静态图片和扫描页 | `public/uploads/` |
| 站点正式网址 | `astro.config.mjs` |
| 发布工作流 | `.github/workflows/deploy.yml` |

目前有三个根据公开 README 整理的项目，项目链接为真实仓库；配图是说明性 SVG / CSS 示意，并非实验数据或真实会话截图。博客和笔记均明确标记 `sample: true`，用于展示排版，不表示已由本人发表的文章。尚未提供头像、邮箱、完整教育经历，因此未填入这些信息。

### 增加文章

复制 `templates/post.md` 到 `src/content/writing/`，换一个简短英文文件名。修改 frontmatter 并把 `draft` 改成 `false`。文件名决定文章网址，不要与其他内容重名。

- `kind: blog` → `/blog/文件名/`
- `kind: notes` → `/notes/文件名/`
- `sample: true` → 展示“排版示例”提示；正式内容改成 `false`。
- `draft: true` → 不生成页面，也不出现在列表中。
- `date` 为内容日期，请按实际日期填写。

公式用 `$...$`（行内）和 `$$...$$`（独立公式），使用 KaTeX 在构建时生成，不需要访问外部 CDN。二、三级标题自动进入目录，代码块自动高亮。将扩展名改为 `.mdx` 可在文章中引入 Astro 组件。

### 手写笔记，不必重新誊写

把筛选好的扫描图放进 `public/uploads/`，复制 `templates/handwritten-note.md`，只写主题、关键词、简短说明和图片路径即可。真实手写图尚未添加。

```markdown
![手写推导第 1 页：说明这页的主题](/uploads/my-note-01.jpg)
```

图片过大时先压缩；PDF 也可放在该目录后用 Markdown 链接引用。发布前确认这些材料可以公开。无需配置数据库或后端上传功能。

## 双缝干涉演示

`src/pages/playground/index.astro` 中使用 Canvas 绘制理想双缝远场干涉，屏距为 1 m：

`I / Imax = cos²(π d x / (λ L))`，条纹间距 `Δx = λ L / d`。

不含有限缝宽衍射包络、有限相干性或实验测量；颜色为可视化示意。所有计算在浏览器内运行，没有 API 请求。
