import type { FetchResult } from '#app';

export type FetchedUser = FetchResult<'/api/user/:username', 'GET'>;
export type User = NonNullable<FetchedUser>;

export type FetchedPost = FetchResult<'/api/post/:id', 'GET'>;
export type Post = NonNullable<FetchedPost>;

export type FetchedPostWithLike = FetchResult<'/api/post/with-like/:id', 'GET'>;
export type PostWithLike = NonNullable<FetchedPostWithLike>;
