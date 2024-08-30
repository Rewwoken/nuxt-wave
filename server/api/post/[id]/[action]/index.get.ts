import { checkPostBookmark } from '~/server/database/post/actions/bookmark';
import { checkPostLike } from '~/server/database/post/actions/like';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const { success, data: params } = await getValidatedRouterParams(event, postActionSchema.safeParse);
		if (!success) {
			throw serverError(400, 'invalid-params');
		}

		const initiatorId = getCurrentUser(event, 'id');

		if (params.action === 'like') {
			return checkPostLike(initiatorId, params.id);
		}

		if (params.action === 'bookmark') {
			return checkPostBookmark(initiatorId, params.id);
		}
	},
});
