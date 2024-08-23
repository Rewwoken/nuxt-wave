import { findUniqueUser } from '~/server/database/user/crud/read';

export default defineEventHandler(async (event) => {
	const query = await getValidatedQuery(event, findUserSchema.safeParse);
	if (!query.success) {
		throw serverError(400, 'invalid-query');
	}

	const findUser = await findUniqueUser(query.data);
	if (!findUser) {
		throw serverError(404, 'user-not-found');
	}

	return findUser;
});
