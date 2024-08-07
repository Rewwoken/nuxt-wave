import { z } from 'zod';
import { findPostWithLikeStatus } from '~/server/database/post';

export default defineEventHandler(async (event) => {
	const params = await getValidatedRouterParams(event, z.object({
		id: z.string(),
	}).parse);

	setResponseStatus(event, 200);

	const initiatorUserId = event.context.user.id;
	return findPostWithLikeStatus(initiatorUserId, params.id);
});
