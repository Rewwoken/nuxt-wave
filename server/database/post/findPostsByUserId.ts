import { prisma } from '~/server/database';
import type { PaginationOptions } from '~/server/database/post';
import { PostSelect } from '~/server/database/post';

/**
 * @description Finds user posts.
 *
 * @param userId - The ID of the user whose posts are being fetched.
 * @param options - The pagination options.
 * @returns A promise that resolves to an array of posts.
 */
export async function findPostsByUserId(userId: string, options: PaginationOptions) {
	return prisma.post.findMany({
    where: { user: { id: userId } },
    skip: options.skip,
    take: options.take,
    select: PostSelect,
  });
}
