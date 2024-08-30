import { checkPostBookmark } from '~/server/database/post/actions/bookmark';
import { checkPostLike } from '~/server/database/post/actions/like';

export async function getPostStatus(userId: string, postId: string) {
	const liked = await checkPostLike(userId, postId);
	const bookmarked = await checkPostBookmark(userId, postId);

	return { liked, bookmarked };
}
