import { z } from 'zod';
import { checkPostBookmark } from '~/server/database/post/actions/bookmark';
import { checkPostLike } from '~/server/database/post/actions/like';
import { findThreadsByUserId } from '~/server/database/post/crud/read';

const paramsSchema = z.object({
	id: z.string(),
});

const querySchema = z.object({
	skip: z.coerce.number().min(0).default(0),
	take: z.coerce.number().min(1).max(10).default(3),
});

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, paramsSchema.parse);
		const query = await getValidatedQuery(event, querySchema.parse);

		// Find the threads for the given user id
		const threads = await findThreadsByUserId(params.id, {
			skip: query.skip,
			take: query.take,
		});

		// Get the user ID from the event context
		const initatorId = event.context.user.id;

		try {
			// Retrieve the status of each thread, parent post, and root post
			const threadsWithStatuses = await Promise.all(
				threads.map(async ({ rootPost, parentPost, ...post }) => {
					const postStatus = {
						liked: await checkPostLike(initatorId, post.id),
						bookmarked: await checkPostBookmark(initatorId, post.id),
					};

					const parentId = parentPost!.id;
					const rootId = rootPost!.id;

					const parentStatus = {
						liked: await checkPostLike(initatorId, parentId),
						bookmarked: await checkPostBookmark(initatorId, parentId),
					};

					// If parent post is the root, reuse the parent's status, otherwise get its status
					const rootStatus = parentId === rootId
						? parentStatus
						: {
							liked: await checkPostLike(initatorId, rootId),
							bookmarked: await checkPostBookmark(initatorId, rootId),
						};

					return {
						// Include the latest post with its status
						post: {
							...post,
							status: postStatus,
						},
						// Include the parent post with its status
						parentPost: {
							...parentPost!, // * Non-null Assertion because of `parentPost: { isNot: null }` in the Prisma query
							status: parentStatus,
						},
						// Include the root post with its status
						rootPost: {
							...rootPost!, // * Non-null Assertion because of `rootPost: { isNot: null }` in the Prisma query
							status: rootStatus,
						},
					};
				}),
			);

			return threadsWithStatuses;
		}
		catch {
			// Throw an error if there is an issue retrieving the threads
			throw serverError();
		}
	},
});
