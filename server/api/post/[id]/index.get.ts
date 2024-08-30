import { z } from 'zod';
import { findPostById } from '~/server/database/post/crud/read';

const schema = z.object({
	id: z.string(),
});

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, schema.parse);

		const post = await findPostById(params.id);
		if (!post) {
			throw serverError(404, 'not-found');
		}

		const initiatorId = getCurrentUser(event, 'id');
		try {
			const status = await getPostStatus(initiatorId, post.id);
			return Object.assign(post, { status });
		}
		catch {
			throw serverError();
		}
	},
});
