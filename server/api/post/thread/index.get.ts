import { z } from 'zod';
import { checkPostBookmark } from '~/server/database/post/actions/bookmark';
import { checkPostLike } from '~/server/database/post/actions/like';
import { findThreadsByUserId } from '~/server/database/post/crud/read';

const schema = z.object({
	userId: z.string(),
	skip: z.coerce.number().min(0).default(0),
	take: z.coerce.number().min(1).max(10).default(3),
});

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		// Validate and parse the query parameters
		const queryParse = await getValidatedQuery(event, schema.safeParse);
		if (!queryParse.success) {
			throw serverError(400, 'invalid-query');
		}

		// Find the threads for the given user
		const threads = await findThreadsByUserId(queryParse.data.userId, {
			skip: queryParse.data.skip,
			take: queryParse.data.take,
		});

		// Get the user ID from the event context
		const userId = event.context.user.id;

		try {
			// Retrieve the status of each thread, parent post, and root post
			const threadsWithStatus = await Promise.all(
				threads.map(async (thread) => {
					const status = {
						liked: await checkPostLike(userId, thread.id),
						bookmarked: await checkPostBookmark(userId, thread.id),
					};

					const parentStatus = {
						liked: await checkPostLike(userId, thread.parentPost!.id),
						bookmarked: await checkPostBookmark(userId, thread.parentPost!.id),
					};

					const rootStatus = {
						liked: await checkPostLike(userId, thread.rootPost!.id),
						bookmarked: await checkPostBookmark(userId, thread.rootPost!.id),
					};

					return {
						...thread,
						// Include the parent post and its status
						parentPost: {
							...thread.parentPost!, // * Non-null Assertion because thread always has a parent
							status: parentStatus,
						},
						// Include the root post and its status
						rootPost: {
							...thread.rootPost!, // * Non-null Assertion because thread always has a root
							status: rootStatus,
						},
						// Include the status of the thread
						status,
					};
				}),
			);

			return threadsWithStatus;
		}
		catch {
			// Throw an error if there is an issue retrieving the threads
			throw serverError();
		}
	},
});
