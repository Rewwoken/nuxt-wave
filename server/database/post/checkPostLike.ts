import { prisma } from '~/server/database';

export async function checkPostLike(userId: string, postId: string) {
	const relation = await prisma.postLikeRelation.findUnique({
		where: {
			initiatorUserId_likedPostId: {
				initiatorUserId: userId,
				likedPostId: postId,
			},
		},
	});

	return Boolean(relation);
}
