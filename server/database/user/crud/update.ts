import type { Prisma } from '@prisma/client';
import { prisma } from '~/server/prisma';

export async function updateUser(userId: string, data: Prisma.UserUpdateInput) {
	return await prisma.user.update({
		where: {
			id: userId,
		},
		data,
	});
}
