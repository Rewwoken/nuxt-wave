import { unBookmarkPost } from '~/server/database/post/actions/bookmark';
import { unLikePost } from '~/server/database/post/actions/like';

export default defineAuthEventHandler(async (event) => {
	const { success: successParams, data: params } = await getValidatedRouterParams(event, postActionSchema.safeParse);
	if (!successParams) {
		throw serverError(400, 'invalid-params');
	}

	const initiatorId = authUser(event, 'id');
	try {
		if (params.action === 'like') {
			return await unLikePost(initiatorId, params.id);
		}

		if (params.action === 'bookmark') {
			return await unBookmarkPost(initiatorId, params.id);
		}
	}
	catch (err) {
		console.error(`Error deleting post ${params.action}:`, err);
		throw serverError();
	}
});
