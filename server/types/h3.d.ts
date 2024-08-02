import 'h3';
import type { findUserById } from '~/server/database/user';

type User = NonNullable<Awaited<ReturnType<typeof findUserById>>>;

declare module 'h3' {
	interface H3EventContext {
		// ~/server/middleware/auth.ts
		user: User & {
			profile: NonNullable<Pick<User, 'profile'>>;
		};
	}
}
