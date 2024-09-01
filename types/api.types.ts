import type { FetchResult } from '#app';

export type FetchedUser = FetchResult<'/api/user', 'GET'>;
export type User = NonNullable<FetchedUser>;

export type Posts = FetchResult<'/api/user/:id/posts', 'GET'>;
export type Post = Posts[number];

export type Threads = FetchResult<'/api/user/:id/threads', 'GET'>;
export type Thread = Threads[number];
