import { prisma } from '~/server/database';
import type { PaginationOptions } from '~/server/database/post/options';
import { PostOrder, PostSelect } from '~/server/database/post/options';

/**
 * @description Finds user posts.
 *
 * @param userId - The ID of the user whose posts are being fetched.
 * @param options - The pagination options.
 * @returns A promise that resolves to an array of posts, including parent post if exists.
 */
export async function findPostsByUserId(userId: string, options: PaginationOptions) {
	return prisma.post.findMany({
		where: { user: { id: userId } },
		skip: options.skip,
		take: options.take,
		select: {
			...PostSelect,
			parentPost: {
				select: PostSelect,
			},
		},
		orderBy: PostOrder,
	});
}

export function findPostById(id: string) {
	return prisma.post.findUnique({
		where: { id },
		select: {
			...PostSelect,
			parentPost: {
				select: PostSelect,
			},
		},
	});
}
