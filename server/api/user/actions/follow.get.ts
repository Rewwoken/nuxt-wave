import { z } from 'zod';
import { followUser } from '~/server/database/user/follow';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const query = await getValidatedQuery(event, z.object({
			id: z.string(),
		}).parse);

		const userId = event.context.user.id;
		try {
			await followUser(userId, query.id);
		}
		catch {
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'error/unknown',
			});
		}
	},
});
