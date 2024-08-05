import 'h3';
import type { findUniqueUser } from '~/server/database/user';

type User = NonNullable<Awaited<ReturnType<typeof findUniqueUser>>>;

declare module 'h3' {
	interface H3EventContext {
		user: User; // Set in ~/server/utils/auth.ts
	}
}
