import type { Prisma } from '@prisma/client';
import { prisma } from '~/server/database';

export async function updateUser(userId: string, data: Prisma.UserUpdateInput) {
	return prisma.user.update({
		where: {
			id: userId,
		},
		data,
	});
}
