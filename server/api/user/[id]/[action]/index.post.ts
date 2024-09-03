import { blockUser } from '~/server/database/user/actions/block';
import { followUser } from '~/server/database/user/actions/follow';

export default defineAuthEventHandler(async (event) => {
	const { success: successParams, data: params } = await getValidatedRouterParams(event, userActionSchema.safeParse);
	if (!successParams) {
		throw serverError(400, 'invalid-params');
	}

	const initiatorId = authUser(event, 'id');

	try {
		if (params.action === 'follow') {
			return await followUser(initiatorId, params.id);
		}

		if (params.action === 'block') {
			return await blockUser(initiatorId, params.id);
		}
	}
	catch (err) {
		console.error(`Error performing ${params.action} action:`, err);
		throw serverError();
	}
});
