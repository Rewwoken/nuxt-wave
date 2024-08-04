import { verifyUser } from '~/server/database/verificationCode';
import { codeSchema } from '~/schemas/code';
import { deleteUserById } from '~/server/database/user';

export default defineEventHandler(async (event) => {
	const query = await getValidatedQuery(event, codeSchema.parse);

	try {
		setResponseStatus(event, 200);
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
