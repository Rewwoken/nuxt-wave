import type { Prisma } from '@prisma/client';

export const UserSelect: Prisma.UserSelect = {
	id: true,
	email: true,
	username: true,
};
