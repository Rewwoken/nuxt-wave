import { blockUser } from '~/server/database/user/actions/block';
import { followUser } from '~/server/database/user/actions/follow';
import { userActionSchema } from '~/server/schemas/user-action';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, userActionSchema.parse);

		const userId = event.context.user.id;

		if (params.action === 'follow') {
			return followUser(userId, params.id);
		}

		if (params.action === 'block') {
			return blockUser(userId, params.id);
		}
	},
});
