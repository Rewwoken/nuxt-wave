import { userActionSchema } from '~/schemas/actions/user-action';
import { checkBlocking } from '~/server/database/user/actions/block';
import { checkFollowing } from '~/server/database/user/actions/follow';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const params = await getValidatedRouterParams(event, userActionSchema.parse);

		const userId = event.context.user.id;
		setResponseStatus(event, 200);

		if (params.action === 'follow') {
			return checkFollowing(userId, params.id);
		}

		if (params.action === 'block') {
			return checkBlocking(userId, params.id);
		}
	},
});
