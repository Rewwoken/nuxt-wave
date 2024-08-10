import type { Prisma } from '@prisma/client';
import { prisma } from '~/server/database';

export async function findUniqueUser(where: Prisma.UserWhereUniqueInput) {
	return prisma.user.findUnique({
		where,
		select: {
			id: true,
			username: true,
			createdAt: true,
			profile: {
				select: {
					name: true,
					bio: true,
					location: true,
					website: true,
					imageUrl: true,
					bannerUrl: true,
				},
			},
		},
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
