import { z } from 'zod';
import { checkFollowing } from '~/server/database/user/follow';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const query = await getValidatedQuery(event, z.object({
			id: z.string(),
		}).parse);

		const id = event.context.user.id;
		return checkFollowing(id, query.id);
	},
});
