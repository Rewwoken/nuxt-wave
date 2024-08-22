import { prisma } from '~/server/database';

export function countPostsByUserId(userId: string) {
	return prisma.post.count({
		where: {
			user: { id: userId },
			parentPost: { is: null },
		},
	});
}
