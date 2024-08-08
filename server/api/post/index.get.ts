import { z } from 'zod';
import { checkPostBookmark, checkPostLike, findPostsByUserId } from '~/server/database/post';

const schema = z.object({
	userId: z.string(),
	skip: z.coerce.number().min(0).default(0),
	take: z.coerce.number().min(1).max(20).default(20),
});

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const query = await getValidatedQuery(event, schema.parse);

		const posts = await findPostsByUserId(query.userId, {
			skip: query.skip,
			take: query.take,
		});

		const userId = event.context.user.id;

		try {
			const postsWithStatus = await Promise.all(
				posts.map(async (post) => {
					const status = {
						liked: await checkPostLike(userId, post.id),
						bookmarked: await checkPostBookmark(userId, post.id),
					};

					return { ...post, status };
				}),
			);

			return postsWithStatus;
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
