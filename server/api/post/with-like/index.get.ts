import { z } from 'zod';
import { findPostsWithLikeStatus } from '~/server/database/post';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const query = await getValidatedQuery(event, z.object({
			userId: z.string(),
			skip: z.coerce.number().min(0).default(0),
			take: z.coerce.number().min(1).max(20).default(20),
		}).parse);

		setResponseStatus(event, 200);

		const initiatorUserId = event.context.user.id;
		return findPostsWithLikeStatus(initiatorUserId, query.userId, {
			skip: query.skip,
			take: query.take,
		});
	},
});
