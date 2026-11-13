---
title: 把这个站点部署到 GitHub Pages
date: 2026-10-28
summary: 从零到公网可访问，一份不绕路的静态站点部署流程。
tags: 部署, GitHub, 工作流
---

这个站点是纯静态的：`npm run build` 之后，`dist` 目录里就是全部内容。所以托管这件事可以非常简单。

## 两种部署方式

GitHub Pages 支持两种常见做法：

| 方式 | 做法 | 适合谁 |
| --- | --- | --- |
| 分支部署 | 把构建产物推到 `gh-pages` 分支 | 想手动控制的人 |
| Actions 部署 | 每次 push 自动构建并发布 | 大多数人 |

我选了第二种。仓库里那份 `.github/workflows/deploy.yml` 会在每次推送到 `main` 时自动完成构建和发布，本地不需要额外操作。

## 关键的三步

1. 仓库 **Settings → Pages** 里，把 Source 设为 **GitHub Actions**；
2. 推送代码到 `main` 分支；
3. 等 Actions 里的 `Deploy to GitHub Pages` 跑完，访问 `https://<用户名>.github.io/`。

## 关于路径

如果站点部署在 `https://<用户名>.github.io` 根仓库，构建时的 `base` 保持 `/` 即可。

如果换成 `https://<用户名>.github.io/blog` 这样的子路径，就需要把 `base` 改成 `/blog/`：

```bash
VITE_BASE=/blog/ npm run build
```

否则页面里的 JS、CSS 和游戏文件都会 404——这是新手最容易踩的坑。

## 为什么用 Hash 路由

GitHub Pages 是静态托管，没有服务端。直接访问 `/notes/hello` 这样的地址时，服务器找不到对应的文件，就会返回 404。

有两种解决办法：配置 404 回退页，或者使用 Hash 路由（`/#/notes/hello`）。我选了后者，因为它在任何静态托管平台都能工作，不需要额外配置。

## 更新内容

日常写作的流程只有三步：

```bash
# 1. 在 src/content/posts/ 新建一个 .md
# 2. 本地预览
npm run dev
# 3. 提交并推送
git add . && git commit -m "new post" && git push
```

推上去之后，GitHub Actions 会自动重新构建，一两分钟后线上就更新了。
