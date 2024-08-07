import { prisma } from '~/server/database';
import type { PaginationOptions } from '~/server/database/post';
import { PostSelect, checkPostLike } from '~/server/database/post';

/**
 * @description Finds user posts with like status.
 *
 * @param initiatorUserId - The ID of the user who initiates the request.
 * @param userId - The ID of the user whose posts are being fetched.
 * @param options - The pagination options.
 * @returns A promise that resolves to an array of posts with like status.
 */
export async function findPostsWithLikeStatus(initiatorUserId: string, userId: string, options: PaginationOptions) {
	const posts = await prisma.post.findMany({
    where: { user: { id: userId } },
    skip: options.skip,
    take: options.take,
    select: PostSelect,
  });

  const postsWithLikes = await Promise.all(
    posts.map(async (post) => {
      const isLiked = await checkPostLike(initiatorUserId, post.id);

      return { ...post, isLiked };
    }),
  );

  return postsWithLikes;
}
