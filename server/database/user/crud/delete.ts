import { prisma } from '~/server/prisma';

export async function deleteUserById(userId: string) {
	return prisma.user.delete({
		where: {
			id: userId,
		},
	});
}
