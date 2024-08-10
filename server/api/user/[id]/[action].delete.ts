import { unBlockUser } from '~/server/database/user/actions/block';
import { unFollowUser } from '~/server/database/user/actions/follow';
import { userActionSchema } from '~/server/schemas/user-action';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, userActionSchema.parse);

		const userId = event.context.user.id;
		setResponseStatus(event, 200);

		if (params.action === 'follow') {
			return unFollowUser(userId, params.id);
		}

		if (params.action === 'block') {
			return unBlockUser(userId, params.id);
		}
	},
});
