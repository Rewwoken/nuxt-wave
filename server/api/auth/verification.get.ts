import { deleteUserById } from '~/server/database/user/crud/delete';
import { verifyUser } from '~/server/database/verification-code/verify';
import { codeSchema } from '~/server/schemas/code';

export default defineEventHandler(async (event) => {
	const query = await getValidatedQuery(event, codeSchema.parse);

	try {
		return await verifyUser(query.id, query.code);
	}
	catch (err) {
		if (err instanceof Error) {
			if (err.message === 'error/expired') {
				await deleteUserById(query.id);

				throw createError({
					statusCode: 400,
					statusMessage: 'Bad Request',
					message: 'error/expired',
				});
			}
			else if (err.message === 'error/not-found') {
				throw createError({
					statusCode: 400,
					statusMessage: 'Bad Request',
					message: 'error/not-found',
				});
			}
		}

		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'error/unknown',
		});
	}
});
