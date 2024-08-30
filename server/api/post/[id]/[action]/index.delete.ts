import { unBookmarkPost } from '~/server/database/post/actions/bookmark';
import { unLikePost } from '~/server/database/post/actions/like';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const { success, data: params } = await getValidatedRouterParams(event, postActionSchema.safeParse);
		if (!success) {
			throw serverError(400, 'invalid-params');
		}

		const initiatorId = getCurrentUser(event, 'id');

		if (params.action === 'like') {
			return unLikePost(initiatorId, params.id);
		}

		if (params.action === 'bookmark') {
			return unBookmarkPost(initiatorId, params.id);
		}
	},
});
