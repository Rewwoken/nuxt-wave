import { checkPostBookmark } from '~/server/database/post/actions/bookmark';
import { checkPostLike } from '~/server/database/post/actions/like';
import { postActionSchema } from '~/server/schemas/post-action';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, postActionSchema.parse);

		const userId = event.context.user.id;

		if (params.action === 'like') {
			return checkPostLike(userId, params.id);
		}

		if (params.action === 'bookmark') {
			return checkPostBookmark(userId, params.id);
		}
	},
});
