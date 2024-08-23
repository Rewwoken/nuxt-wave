import { checkPostBookmark } from '~/server/database/post/actions/bookmark';
import { checkPostLike } from '~/server/database/post/actions/like';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, postActionSchema.parse);

		const initiatorId = event.context.user.id;

		if (params.action === 'like') {
			return checkPostLike(initiatorId, params.id);
		}

		if (params.action === 'bookmark') {
			return checkPostBookmark(initiatorId, params.id);
		}
	},
});
