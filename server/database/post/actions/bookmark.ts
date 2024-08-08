import { prisma } from '~/server/database';

export function bookmarkPost(initiatorUserId: string, postId: string) {
	return prisma.postBookmarkRelation.create({
		data: {
			initiatorUser: {
				connect: { id: initiatorUserId },
			},
			bookmarkedPost: {
				connect: { id: postId },
			},
		},
	});
}

export function unBookmarkPost(initiatorUserId: string, postId: string) {
	return prisma.postBookmarkRelation.delete({
		where: {
			initiatorUserId_bookmarkedPostId: {
				initiatorUserId,
				bookmarkedPostId: postId,
			},
		},
	});
}

export async function checkPostBookmark(initiatorUserId: string, postId: string) {
	const relation = await prisma.postBookmarkRelation.findUnique({
		where: {
			initiatorUserId_bookmarkedPostId: {
				initiatorUserId,
				bookmarkedPostId: postId,
			},
		},
	});

	return Boolean(relation);
}
