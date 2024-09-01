import { CACHE_BASE, CACHE_FUNCTIONS_PREFIX } from '~/server/cache/constants';
import { THREADS_CACHE_MAX_PAGES, THREADS_CACHE_NAME } from '~/server/cache/thread/constants';
import { THREADS_PER_PAGE } from '~/server/database/post/constants';

export function generateThreadsCacheKey(userId: string, page: number) {
	return `${userId}:[${page * THREADS_PER_PAGE}-${THREADS_PER_PAGE}]`;
}

export async function invalidateThreadsCache(userId: string) {
	const cacheKeys = Array.from(
		{ length: THREADS_CACHE_MAX_PAGES + 1 },
		(el, page) => generateThreadsCacheKey(userId, page),
	);

	const prefix = `${CACHE_FUNCTIONS_PREFIX}:${THREADS_CACHE_NAME}`;

	for (const cacheKey of cacheKeys) {
		const removeKey = `${prefix}:${cacheKey}.json`;
		await useStorage(CACHE_BASE).removeItem(removeKey);
	}
}
