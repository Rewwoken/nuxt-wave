import { prisma } from '~/server/prisma';

export async function likePost(initiatorUserId: string, postId: string) {
	return await prisma.postLikeRelation.create({
		data: {
			initiatorUser: {
				connect: { id: initiatorUserId },
			},
			likedPost: {
				connect: { id: postId },
			},
		},
	});
}

export async function unLikePost(initiatorUserId: string, postId: string) {
	return await prisma.postLikeRelation.delete({
		where: {
			initiatorUserId_likedPostId: {
				initiatorUserId,
				likedPostId: postId,
			},
		},
	});
}

export async function checkPostLike(initiatorUserId: string, postId: string) {
	const relation = await prisma.postLikeRelation.findUnique({
		where: {
			initiatorUserId_likedPostId: {
				initiatorUserId,
				likedPostId: postId,
			},
		},
	});

	return Boolean(relation);
}
