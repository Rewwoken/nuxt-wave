import { z } from 'zod';
import { isUsername } from '~/schemas/auth/register';
import { findUniqueUser } from '~/server/database/user/crud/read';

const schema = z.object({
	username: z.string().regex(isUsername),
});

export default defineEventHandler(async (event) => {
	const query = await getValidatedRouterParams(event, schema.parse);

	const findUser = await findUniqueUser({ username: query.username });
	if (!findUser) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'error/not-found',
		});
	}

	return findUser;
});
