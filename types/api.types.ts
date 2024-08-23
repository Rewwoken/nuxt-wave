import type { FetchResult } from '#app';

export type FetchedUser = FetchResult<'/api/user', 'GET'>;
export type User = NonNullable<FetchedUser>;

export type FetchedPost = FetchResult<'/api/post/:id', 'GET'>;
export type Post = NonNullable<FetchedPost>;

export type Threads = FetchResult<'/api/user/:id/threads', 'GET'>;
export type Thread = Threads[number];
