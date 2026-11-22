import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	site: 'https://www.alfinaditya.com',
	integrations: [sitemap()],
	markdown: {
		shikiConfig: { theme: 'tokyo-night' },
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
