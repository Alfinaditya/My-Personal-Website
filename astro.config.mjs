import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const codeTheme = {
	name: 'site-dark',
	type: 'dark',
	colors: {
		'editor.background': '#14161A',
		'editor.foreground': '#D3D7DE',
	},
	tokenColors: [
		{ settings: { foreground: '#D3D7DE' } },
		{ scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#9BA1AB' } },
		{
			scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.operator.new', 'keyword.control'],
			settings: { foreground: '#C4A7F5' },
		},
		{
			scope: ['entity.name.function', 'support.function', 'variable.other.constant', 'entity.name.type', 'support.type', 'support.class', 'entity.name.class', 'entity.name.tag'],
			settings: { foreground: '#7AA2F7' },
		},
		{
			scope: ['string', 'constant.numeric', 'constant.language', 'constant.other', 'entity.other.attribute-name'],
			settings: { foreground: '#F2A25C' },
		},
	],
};

const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });

const copyIcon = el(
	'svg',
	{
		ariaHidden: 'true',
		width: '16',
		height: '16',
		viewBox: '0 0 24 24',
		fill: 'none',
		stroke: 'currentColor',
		strokeWidth: '1.8',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
	},
	[
		el('rect', { x: '9', y: '9', width: '12', height: '12', rx: '2' }),
		el('path', { d: 'M5 15V5a2 2 0 0 1 2-2h10' }),
	],
);

/** Wraps each code block in the design's frame: a header with the file name (```ts title="x.ts") or language, plus a copy button. */
const codeFrame = {
	name: 'code-frame',
	root(root) {
		const title = this.options.meta?.__raw?.match(/title="([^"]+)"/)?.[1];
		const lang = this.options.lang;
		const label = title ?? (lang && !['text', 'plaintext', 'txt'].includes(lang) ? lang : '');
		root.children = [
			el('div', { className: ['code-block'] }, [
				el('div', { className: ['code-head'] }, [
					el('span', {}, [{ type: 'text', value: label }]),
					el('button', { type: 'button', className: ['copy-btn'], ariaLabel: 'Copy code' }, [copyIcon]),
				]),
				...root.children,
			]),
		];
		return root;
	},
};

export default defineConfig({
	site: 'https://www.alfinaditya.com',
	integrations: [sitemap()],
	markdown: {
		shikiConfig: { theme: codeTheme, transformers: [codeFrame] },
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
