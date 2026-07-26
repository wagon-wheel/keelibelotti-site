# Keeli Belotti

A minimal personal site and blog, built with [Astro](https://astro.build).

Design uses a single accent colour — **Etruscan Red** (`#805348`, Farrow & Ball No. 56) — on a warm off-white background with serif typography.

## Getting started

You'll need [Node.js](https://nodejs.org/) 20 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to preview the site locally.

## Writing posts

Add a Markdown file to `src/content/blog/`:

```md
---
title: "Your post title"
description: "Optional short summary for the index page."
pubDate: 2026-07-26
draft: false
---

Your content here.
```

Set `draft: true` to hide a post from the site while you're working on it.

## Custom domain

1. Update `site` in `astro.config.mjs` to your domain (e.g. `https://yourdomain.com`).
2. Add a `public/CNAME` file containing your domain (see `public/CNAME.example`).
3. Point your domain's DNS to GitHub Pages (see [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

## Deploy

Push to GitHub and enable **Pages → Source: GitHub Actions** in your repo settings. The included workflow builds and deploys on every push to `main`.

## Project structure

```
src/
  content/blog/   # Markdown posts
  layouts/        # Page shells
  pages/          # Routes
  styles/         # Global CSS
public/           # Static assets
```
