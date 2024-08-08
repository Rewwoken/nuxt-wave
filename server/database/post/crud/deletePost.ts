import { prisma } from '~/server/database';

export async function deletePost(userId: string, postId: string) {
	// ! Post deletion is extended in ~/server/database/index.ts
	return prisma.post.delete({
		where: {
			id: postId,
			user: { id: userId },
		},
	});
}
