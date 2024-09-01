import { CACHE_BASE, CACHE_FUNCTIONS_PREFIX } from '~/server/cache/constants';
import { POSTS_CACHE_MAX_PAGES, POSTS_CACHE_NAME } from '~/server/cache/post/constants';
import { POSTS_PER_PAGE } from '~/server/database/post/constants';

export function generatePostsCacheKey(userId: string, page: number) {
	return `${userId}:[${page * POSTS_PER_PAGE}-${POSTS_PER_PAGE}]`;
}

export async function invalidatePostsCache(userId: string) {
	const cacheKeys = Array.from(
		{ length: POSTS_CACHE_MAX_PAGES + 1 },
		(el, page) => generatePostsCacheKey(userId, page),
	);

	const prefix = `${CACHE_FUNCTIONS_PREFIX}:${POSTS_CACHE_NAME}`;

	for (const cacheKey of cacheKeys) {
		const removeKey = `${prefix}:${cacheKey}.json`;
		await useStorage(CACHE_BASE).removeItem(removeKey);
	}
}
