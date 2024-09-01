/**
 * Any changes to this constant will make already cached posts invalid.
 *
 * If you want to change this constant, make sure to invalidate the cache to ensure consistency.
 * @see [~/server/cache/post/manager.ts](../../cache/post/manager.ts)
 */
export const POSTS_PER_PAGE = 5;

/**
 * Any changes to this constant will make already cached threads invalid.
 *
 * If you want to change this constant, make sure to invalidate the cache to ensure consistency.
 * @see [~/server/cache/thread/manager.ts](../../cache/thread/manager.ts)
 */
export const THREADS_PER_PAGE = 3;
