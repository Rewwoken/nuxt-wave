import 'h3';
import type { findUniqueUser } from '~/server/database/user/crud/read';

// TODO: simplify User type
type User = NonNullable<Awaited<ReturnType<typeof findUniqueUser>>>;

declare module 'h3' {
	interface H3EventContext {
		user: User; // Set in ~/server/utils/auth.ts
	}
}
