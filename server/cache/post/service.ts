import {
	POSTS_CACHE_MAX_AGE,
	POSTS_CACHE_MAX_PAGES,
	POSTS_CACHE_NAME,
} from '~/server/cache/post/constants';
import { generatePostsCacheKey } from '~/server/cache/post/manager';
import { findPostsByUserId } from '~/server/database/post/crud/read';

export const getCachedPostsByUserId = defineCachedFunction(
	findPostsByUserId,
	{
		name: POSTS_CACHE_NAME,
		maxAge: POSTS_CACHE_MAX_AGE,
		getKey: (userId: string, page: number) => generatePostsCacheKey(userId, page),
		// - 1 because pages start at 0, so the actual last page is 1 less than the max
		shouldBypassCache: (userId: string, page: number) => page > POSTS_CACHE_MAX_PAGES - 1,
	},
);
