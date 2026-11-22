import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '@/lib/posts';
import { site } from '@/site';

export async function GET(context: APIContext) {
	const posts = await getPosts();
	return rss({
		title: `${site.name} — Blog`,
		description: site.description,
		site: context.site ?? site.url,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
		})),
	});
}
