import type { Prisma } from '@prisma/client';
import { prisma } from '~/server/database';
import { UserSelect } from '~/server/database/user/options';

export async function findUniqueUser(where: Prisma.UserWhereUniqueInput) {
	return prisma.user.findUnique({
		where,
		select: UserSelect,
	});
}

// Used in /api/auth/register.post.ts
export async function findFirstUser(where: Prisma.UserWhereInput) {
	return prisma.user.findFirst({
		where,
		select: {
			id: true,
			email: true,
			verifiedOn: true,
			verificationCode: true,
		},
	});
}

// Used in /api/auth/recovery.post.ts
export async function findUserByEmail(email: string) {
	return prisma.user.findUnique({
		where: { email },
		select: {
			id: true,
			recoveryCode: true,
		},
	});
}
