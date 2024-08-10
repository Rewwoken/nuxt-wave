import { z } from 'zod';
import { checkPostBookmark } from '~/server/database/post/actions/bookmark';
import { checkPostLike } from '~/server/database/post/actions/like';
import { findPostById } from '~/server/database/post/crud/read';

const schema = z.object({
	id: z.string(),
});

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedQuery(event, schema.parse);

		const post = await findPostById(params.id);
		if (!post) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Not Found',
				message: 'error/not-found',
			});
		}

		const userId = event.context.user.id;
		try {
			const status = {
				liked: await checkPostLike(userId, post.id),
				bookmarked: await checkPostBookmark(userId, post.id),
			};

			return { ...post, status };
		}
		catch {
			throw createError({
				statusCode: 500,
				statusMessage: 'Internal Server Error',
				message: 'error/unknown',
			});
		}
	},
});
