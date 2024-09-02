import { z } from 'zod';
import { findPostById } from '~/server/database/post/crud/read';

const schema = z.object({
	id: z.string(),
});

export default defineAuthEventHandler(async (event) => {
	const params = await getValidatedRouterParams(event, schema.parse);

	const post = await findPostById(params.id);
	if (!post) {
		throw serverError(404, 'not-found');
	}

	const initiatorId = authUser(event, 'id');
	try {
		const status = await getPostStatus(initiatorId, post.id);
		return Object.assign(post, { status });
	}
	catch (err) {
		console.error('Error retrieving post status:', err);
		throw serverError();
	}
});
