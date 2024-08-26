import 'h3';
import type { Prisma } from '@prisma/client';
import type { UserSelect } from '~/server/database/user/options';

type User = Prisma.UserGetPayload<{ select: typeof UserSelect }>;

declare module 'h3' {
	interface H3EventContext {
		user: User | undefined; // Set in ~/server/utils/auth.ts
	}
}
