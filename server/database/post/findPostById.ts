import { prisma } from '~/server/database';

export function findPostById(id: string) {
	return prisma.post.findUnique({
		where: { id },
		select: {
			id: true,
			text: true,
			createdAt: true,
			updatedAt: true,
			mediaFiles: {
				select: {
					url: true,
				},
			},
			parentPost: {
				select: {
					id: true,
					user: {
						select: {
							id: true,
							username: true,
						},
					},
				},
			},
		},
	});
}
