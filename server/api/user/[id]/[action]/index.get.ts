import { userActionSchema } from '~/schemas/actions/user-action';
import { checkBlocking } from '~/server/database/user/actions/block';
import { checkFollowing } from '~/server/database/user/actions/follow';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const { success, data: params } = await getValidatedRouterParams(event, userActionSchema.safeParse);
		if (!success) {
			throw serverError(400, 'invalid-params');
		}

		const initiatorId = getCurrentUser(event, 'id');

		if (params.action === 'follow') {
			return checkFollowing(initiatorId, params.id);
		}

		if (params.action === 'block') {
			return checkBlocking(initiatorId, params.id);
		}
	},
});
