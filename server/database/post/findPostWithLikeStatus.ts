import { prisma } from '~/server/database';
import { PostSelect, checkPostLike } from '~/server/database/post';

/**
 * @description Finds a single user post with like status.
 *
 * @param initiatorUserId - The ID of the user who initiates the request.
 * @param id - The ID of the post to fetch.
 * @returns A promise that resolves to a post with like status or null.
 */
export async function findPostWithLikeStatus(initiatorUserId: string, id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    select: PostSelect,
  });

  if (!post) {
   return null;
  }

  const isLiked = await checkPostLike(initiatorUserId, post.id);
  return { ...post, isLiked };
}
