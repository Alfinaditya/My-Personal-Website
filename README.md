# alfinaditya.com

Personal site and blog. Astro 7 + Tailwind CSS v4, no client framework.

## Commands

| Command        | Action                                   |
| :------------- | :--------------------------------------- |
| `pnpm install` | Install dependencies                     |
| `pnpm dev`     | Dev server at `localhost:4321`           |
| `pnpm build`   | Type-check, then build to `./dist/`      |
| `pnpm preview` | Preview the production build             |

## Writing a post

Add `src/content/blog/<slug>.md`:

```md
---
title: Post title
description: One sentence summary.
pubDate: 2026-11-22
draft: false
---
```

`draft: true` hides it from the list, the post pages and RSS. Files starting with `_` are ignored.

## Config

Links (email, CV, GitHub, LinkedIn) and the local-time zone live in `src/site.ts`. Colors and fonts are tokens in `src/styles/global.css`.
