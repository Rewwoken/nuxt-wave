import { deleteUserById } from '~/server/database/user/crud/delete';
import { verifyUser } from '~/server/database/verification-code/verify';

export default defineEventHandler(async (event) => {
	const { success: successQuery, data: query } = await getValidatedQuery(event, codeSchema.safeParse);
	if (!successQuery) {
		throw serverError(400, 'invalid-query');
	}

	try {
		return await verifyUser(query.id, query.code);
	}
	catch (err) {
		console.error('Error verifying user', err);

		if (err instanceof Error) {
			if (err.message === 'error/expired') {
				await deleteUserById(query.id);
				throw serverError(400, 'expired');
			}
			else if (err.message === 'error/not-found') {
				throw serverError(404, 'not-found');
			}
		}

		throw serverError();
	}
});
