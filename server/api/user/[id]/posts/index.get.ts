import { z } from 'zod';
import { getCachedPostsByUserId } from '~/server/cache/post/service';

const paramsSchema = z.object({
	id: z.string(),
});

const querySchema = z.object({
	page: z.coerce.number().min(0).default(0),
});

export default defineAuthEventHandler(async (event) => {
	const params = await getValidatedRouterParams(event, paramsSchema.parse);
	const query = await getValidatedQuery(event, querySchema.parse);

	const posts = await getCachedPostsByUserId(params.id, query.page);

	const initiatorId = authUser(event, 'id');
	try {
		const postsWithStatus = await Promise.all(
			posts.map(async (post) => {
				const status = await getPostStatus(initiatorId, post.id);

				return Object.assign(post, { status });
			}),
		);

		return postsWithStatus;
	}
	catch (err) {
		console.error('Error fetching post statuses:', err);
		throw serverError();
	}
});
