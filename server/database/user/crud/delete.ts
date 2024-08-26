import { prisma } from '~/server/database';

export async function deleteUserById(userId: string) {
	return prisma.user.delete({
		where: {
			id: userId,
		},
	});
}
