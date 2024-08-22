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
 * Finds replies (posts with a parent) by the given user ID.
 *
 * @param userId - The ID of the user to find replies for.
 * @param options - The pagination options to apply to the query.
 * @return A promise that resolves to an array of replies.
 */
export async function findThreadsByUserId(userId: string, options: PaginationOptions) {
	return prisma.post.findMany({
		where: {
			user: { id: userId },
			parentPost: { isNot: null }, // ! Replies are posts with a parent
			rootPost: { isNot: null }, // ! Replies must have a root post
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

/**
 * Finds the root post ID of the thread for a given post ID.
 *
 * If the given post is the root post of the thread, returns the provided post ID.
 *
 * @param postId - The ID of the post to find the root post of the thread for.
 * @return The ID of the root post of the thread.
 */
export async function findRootPostIdById(postId: string) {
	const result = await prisma.post.findUnique({
		where: { id: postId },
		select: {
			rootPostId: true,
		},
	});

	if (!result) {
		return null;
	}

	return result.rootPostId ?? postId;
}
