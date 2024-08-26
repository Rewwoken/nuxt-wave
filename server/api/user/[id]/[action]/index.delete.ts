import { userActionSchema } from '~/schemas/actions/user-action';
import { unBlockUser } from '~/server/database/user/actions/block';
import { unFollowUser } from '~/server/database/user/actions/follow';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, userActionSchema.parse);

		const initiatorId = getCurrentUser(event, 'id');
		setResponseStatus(event, 200);

		if (params.action === 'follow') {
			return unFollowUser(initiatorId, params.id);
		}

		if (params.action === 'block') {
			return unBlockUser(initiatorId, params.id);
		}
	},
});
