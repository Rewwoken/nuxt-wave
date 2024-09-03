import { prisma } from '~/server/prisma';
import { POSTS_PER_PAGE, THREADS_PER_PAGE } from '~/server/database/post/constants';
import { postSelect, postsOrder } from '~/server/database/post/options';

/**
 * Finds top-level (without a parent) posts by the given user ID.
 *
 * @param userId - The ID of the user to find posts for.
 * @param page - The page number for pagination.
 * @return A promise that resolves to an array of top-level posts.
 */
export async function findPostsByUserId(userId: string, page: number) {
	return await prisma.post.findMany({
		where: {
			user: { id: userId },
			parentPost: { is: null }, // ! Find only top-level posts
		},
		select: postSelect,
		skip: page * POSTS_PER_PAGE,
		take: POSTS_PER_PAGE,
		orderBy: postsOrder,
	});
}

/**
 * Finds threads (posts with a parent and root post) by the given user ID.
 *
 * @param userId - The ID of the user to find threads for.
 * @param page - The page number for pagination.
 * @return A promise that resolves to an array of threads.
 */
export async function findThreadsByUserId(userId: string, page: number) {
	return await prisma.post.findMany({
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
		skip: page * THREADS_PER_PAGE,
		take: THREADS_PER_PAGE,
		orderBy: postsOrder,
	});
}

export async function findPostById(id: string) {
	return await prisma.post.findUnique({
		where: { id },
		select: postSelect,
	});
}

export async function findPostWithRootById(id: string) {
	return await prisma.post.findUnique({
		where: { id },
		select: {
			...postSelect,
			rootPost: {
				select: postSelect,
			},
		},
	});
}
