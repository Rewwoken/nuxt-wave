import type { Prisma } from '@prisma/client';
import { prisma } from '~/server/prisma';
import { UserSelect } from '~/server/database/user/options';

export async function findUniqueUser(where: Prisma.UserWhereUniqueInput) {
	return await prisma.user.findUnique({
		where,
		select: UserSelect,
	});
}

// Used in /api/auth/login.post.ts
export async function findUserByUsername(username: string) {
	return await prisma.user.findUnique({
		where: { username },
	});
}

// Used in /api/auth/register.post.ts
export async function findUserByUsernameOrEmail(username: string, email: string) {
	return await prisma.user.findFirst({
		where: {
			OR: [{ email }, { username }],
		},
		include: { verificationCode: true },
	});
}

// Used in /api/auth/recovery.post.ts
export async function findUserByEmail(email: string) {
	return await prisma.user.findUnique({
		where: { email },
		include: { recoveryCode: true },
	});
}
