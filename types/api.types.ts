import type { FetchResult } from '#app';

// Bruh, I spent hours to find this type 💀!!
export type User = FetchResult<'/api/user/:username', 'GET'>;
