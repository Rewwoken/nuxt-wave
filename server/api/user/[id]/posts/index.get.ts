import { z } from 'zod';
import { findPostsByUserId } from '~/server/database/post/crud/read';

const paramsSchema = z.object({
	id: z.string(),
});

const querySchema = z.object({
	skip: z.coerce.number().min(0).default(0),
	take: z.coerce.number().min(1).max(20).default(5),
});

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, paramsSchema.parse);
		const query = await getValidatedQuery(event, querySchema.parse);

		const posts = await findPostsByUserId(params.id, {
			skip: query.skip,
			take: query.take,
		});

		const initiatorId = getCurrentUser(event, 'id');

		try {
			const postsWithStatus = await Promise.all(
				posts.map(async (post) => {
					const status = await getPostStatus(initiatorId, post.id);

					return Object.assign(post, { status });
				}),
			);

			return postsWithStatus;
		}
		catch {
			throw serverError();
		}
	},
});
