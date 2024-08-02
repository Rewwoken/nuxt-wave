import { z } from 'zod';
import { isUsername } from '~/schemas/register';
import { findUserByUsername } from '~/server/database/user';

export default defineEventHandler(async (event) => {
	const query = await getValidatedRouterParams(event, z.object({
		username: z.string().regex(isUsername),
	}).parse);

	const findUser = await findUserByUsername(query.username);
	if (!findUser) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'error/not-found',
		});
	}

	return findUser;
});
