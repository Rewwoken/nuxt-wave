import { findUniqueUser } from '~/server/database/user/crud/read';

export default defineEventHandler(async (event) => {
	const { success: successQuery, data: query } = await getValidatedQuery(event, findUserSchema.safeParse);
	if (!successQuery) {
		throw serverError(400, 'invalid-query');
	}

	const user = await findUniqueUser(query);
	if (!user) {
		throw serverError(404, 'user-not-found');
	}

	return user;
});
