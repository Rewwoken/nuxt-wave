import {
	THREADS_CACHE_MAX_AGE,
	THREADS_CACHE_MAX_PAGES,
	THREADS_CACHE_NAME,
} from '~/server/cache/thread/constants';
import { generateThreadsCacheKey } from '~/server/cache/thread/manager';
import { findThreadsByUserId } from '~/server/database/post/crud/read';

export const getCachedThreadsByUserId = defineCachedFunction(
	findThreadsByUserId,
	{
		name: THREADS_CACHE_NAME,
		maxAge: THREADS_CACHE_MAX_AGE,
		getKey: (userId: string, page: number) => generateThreadsCacheKey(userId, page),
		// - 1 because pages start at 0, so the actual last page is 1 less than the max
		shouldBypassCache: (userId: string, page: number) => page > THREADS_CACHE_MAX_PAGES - 1,
	},
);
