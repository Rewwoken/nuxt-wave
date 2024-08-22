import type { FetchResult } from '#app';

export type FetchedUser = FetchResult<'/api/user/:username', 'GET'>;
export type User = NonNullable<FetchedUser>;

export type FetchedPost = FetchResult<'/api/post/:id', 'GET'>;
export type Post = NonNullable<FetchedPost>;

export type PostWithParent = Post & { parentPost: Post };

export type Threads = FetchResult<'/api/post/thread', 'GET'>;
export type Thread = Threads[number];
