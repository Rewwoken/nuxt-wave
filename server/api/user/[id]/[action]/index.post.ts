import { userActionSchema } from '~/schemas/actions/user-action';
import { blockUser } from '~/server/database/user/actions/block';
import { followUser } from '~/server/database/user/actions/follow';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, userActionSchema.parse);

		const initiatorId = getCurrentUser(event, 'id');

		if (params.action === 'follow') {
			return followUser(initiatorId, params.id);
		}

		if (params.action === 'block') {
			return blockUser(initiatorId, params.id);
		}
	},
});
