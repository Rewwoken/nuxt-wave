import { unBlockUser } from '~/server/database/user/actions/block';
import { unFollowUser } from '~/server/database/user/actions/follow';

export default defineAuthEventHandler(async (event) => {
	const { success: successParams, data: params } = await getValidatedRouterParams(event, userActionSchema.safeParse);
	if (!successParams) {
		throw serverError(400, 'invalid-params');
	}

	const initiatorId = authUser(event, 'id');
	try {
		if (params.action === 'follow') {
			return await unFollowUser(initiatorId, params.id);
		}

		if (params.action === 'block') {
			return await unBlockUser(initiatorId, params.id);
		}
	}
	catch (err) {
		console.error(`Error performing ${params.action} deletion:`, err);
		throw serverError();
	}
});
