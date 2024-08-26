import { z } from 'zod';
import { checkPostBookmark } from '~/server/database/post/actions/bookmark';
import { checkPostLike } from '~/server/database/post/actions/like';
import { findPostsByUserId } from '~/server/database/post/crud/read';

const paramsSchema = z.object({
	id: z.string(),
});

const queryShema = z.object({
	skip: z.coerce.number().min(0).default(0),
	take: z.coerce.number().min(1).max(20).default(5),
});

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, paramsSchema.parse);
		const query = await getValidatedQuery(event, queryShema.parse);

		const posts = await findPostsByUserId(params.id, {
			skip: query.skip,
			take: query.take,
		});

		const initatorId = getCurrentUser(event, 'id');

		try {
			const postsWithStatus = await Promise.all(
				posts.map(async (post) => {
					const status = {
						liked: await checkPostLike(initatorId, post.id),
						bookmarked: await checkPostBookmark(initatorId, post.id),
					};

					return { ...post, status };
				}),
			);

			return postsWithStatus;
		}
		catch {
			throw serverError();
		}
	},
});
