import { z } from 'zod';
import { checkPostBookmark, checkPostLike, findPostById } from '~/server/database/post';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedQuery(event, z.object({
			id: z.string(),
		}).parse);

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
