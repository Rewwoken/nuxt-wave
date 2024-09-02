import { z } from 'zod';
import { getCachedThreadsByUserId } from '~/server/cache/thread/service';

const paramsSchema = z.object({
	id: z.string(),
});

const querySchema = z.object({
	page: z.coerce.number().min(0).default(0),
});

export default defineAuthEventHandler(async (event) => {
	const params = await getValidatedRouterParams(event, paramsSchema.parse);
	const query = await getValidatedQuery(event, querySchema.parse);

	const threads = await getCachedThreadsByUserId(params.id, query.page);

	const initiatorId = authUser(event, 'id');
	try {
		// Retrieve the status of each thread, parent post, and root post
		const threadsWithStatuses = await Promise.all(
			threads.map(async ({ rootPost, parentPost, ...post }) => {
				const postStatus = await getPostStatus(initiatorId, post.id);

				const parentId = parentPost!.id;
				const rootId = rootPost!.id;

				const parentStatus = await getPostStatus(initiatorId, parentId);

				// If parent post is the root, reuse the parent's status, otherwise get its status
				const rootStatus = parentId === rootId
					? parentStatus
					: await getPostStatus(initiatorId, rootId);

				// * Non-null assertions because of `{ isNot: null }` in the Prisma query
				return {
					post: Object.assign(post, { status: postStatus }),
					parentPost: Object.assign(parentPost!, { status: parentStatus }),
					rootPost: Object.assign(rootPost!, { status: rootStatus }),
				};
			}),
		);

		return threadsWithStatuses;
	}
	catch (err) {
		console.error('Error fetching thread statuses:', err);
		throw serverError();
	}
});
