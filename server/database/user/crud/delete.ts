import { prisma } from '~/server/database';
import { UserSelect } from '~/server/database/user/options';

export async function deleteUserById(userId: string) {
	return prisma.user.delete({
		where: {
			id: userId,
		},
		select: UserSelect,
	});
}
