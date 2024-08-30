import { prisma } from '~/server/database';
import type { PaginationOptions } from '~/server/database/post/options';
import { postSelect, postsOrder } from '~/server/database/post/options';

/**
 * Finds top-level (without a parent) posts by the given user ID.
 *
 * @param userId - The ID of the user to find posts for.
 * @param options - The pagination options to apply to the query.
 * @return A promise that resolves to an array of top-level posts.
 */
export async function findPostsByUserId(userId: string, options: PaginationOptions) {
	return prisma.post.findMany({
		where: {
			user: { id: userId },
			parentPost: { is: null }, // ! Find only top-level posts
		},
		select: postSelect,
		skip: options.skip,
		take: options.take,
		orderBy: postsOrder,
	});
}

/**
 * Finds threads (posts with a parent and root post) by the given user ID.
 *
 * @param userId - The ID of the user to find threads for.
 * @param options - The pagination options to apply to the query.
 * @return A promise that resolves to an array of threads.
 */
export async function findThreadsByUserId(userId: string, options: PaginationOptions) {
	return prisma.post.findMany({
		where: {
			user: { id: userId },
			parentPost: { isNot: null }, // ! Threads are posts with a parent
			rootPost: { isNot: null }, // ! Threads must have a root post
		},
		select: {
			...postSelect,
			parentPost: {
				select: {
					...postSelect,
					// * Also select parent's parent post id to later compare it with the root post id
					// * to see if there are more posts in a thread
					parentPost: {
						select: {
							id: true,
						},
					},
				},
			},
			rootPost: {
				select: postSelect,
			},
		},
		distinct: ['rootPostId'], // ! Distinct by root posts to avoid fetching posts from the same thread multiple times
		skip: options.skip,
		take: options.take,
		orderBy: postsOrder,
	});
}

export function findPostById(id: string) {
	return prisma.post.findUnique({
		where: { id },
		select: postSelect,
	});
}

export async function findPostWithRootIdById(id: string) {
	return prisma.post.findUnique({
		where: { id },
		select: {
			...postSelect,
			rootPost: {
				select: postSelect,
			},
		},
	});
}
