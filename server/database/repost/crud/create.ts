import { prisma } from '~/server/prisma';
import { repostSelect } from '~/server/database/repost/options';

export function createRepost(userId: string, postId: string, text: string | undefined) {
	return prisma.repost.create({
		data: {
			user: { connect: { id: userId } },
			post: { connect: { id: postId } },
			text,
		},
		select: repostSelect,
	});
}
