import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
	timeZone: 'UTC',
});

export function formatDate(date: Date): string {
	return dateFormat.format(date);
}

export function readingMinutes(body: string | undefined): number {
	const words = body?.trim().split(/\s+/).length ?? 0;
	return Math.max(1, Math.round(words / 220));
}
