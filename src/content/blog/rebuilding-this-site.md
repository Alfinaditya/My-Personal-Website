---
title: Rebuilding this site with less
description: How I moved my personal site from Astro 3 with React to Astro 7 with zero client frameworks, and added a blog on the way.
pubDate: 2026-11-22
---

The old version of this site was one page: a name, three icons and a Download CV button. It still shipped React, Radix and a shadcn button to render that button.

For the rebuild I wanted two things: a place to write, and a site that loads nothing it doesn't use.

## Dropping React

Nothing on the page needs client state. The only moving part is the local time next to my email link, and that's a few lines of plain script:

```js
const fmt = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'Asia/Jakarta',
});
el.textContent = fmt.format(new Date()).toLowerCase();
```

Removing `@astrojs/react` took out React, Radix, `class-variance-authority`, `clsx`, `tailwind-merge` and `lucide-react` with it. The home page now ships no framework JavaScript at all.

## Posts as Markdown

Posts live in `src/content/blog` as Markdown files. A content collection checks their frontmatter at build time, so a post missing its date fails the build instead of rendering wrong:

```ts title="src/content.config.ts"
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});
```

Code blocks are highlighted at build time by Shiki, so there's no highlighter in the browser either.

> The fastest JavaScript is the JavaScript you don't send.

## What's next

- Write here more often than I update my CV
- Notes on things I run into at work
- Small experiments that don't deserve a repo

There's an [RSS feed](/rss.xml) if you'd like to follow along.
