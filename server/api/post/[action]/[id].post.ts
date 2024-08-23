import { bookmarkPost } from '~/server/database/post/actions/bookmark';
import { likePost } from '~/server/database/post/actions/like';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, postActionSchema.parse);

		const initiatorId = event.context.user.id;

		if (params.action === 'like') {
			return likePost(initiatorId, params.id);
		}

		if (params.action === 'bookmark') {
			return bookmarkPost(initiatorId, params.id);
		}
	},
});
