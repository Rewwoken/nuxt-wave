import { deleteRecoveryCodeByUserId, recoverUserPassword } from '~/server/database/recoveryCode';
import { codeSchema } from '~/schemas/code';
import { recoverySchema } from '~/schemas/recovery';

export default defineEventHandler(async (event) => {
	const query = await getValidatedQuery(event, codeSchema.parse);
	const body = await readValidatedBody(event, recoverySchema.parse);

	try {
		setResponseStatus(event, 200);
		return await recoverUserPassword(query.id, body.password, query.code);
	}
	catch (err) {
		if (err instanceof Error) {
			if (err.message === 'error/not-found') {
				throw createError({
					statusCode: 400,
					statusMessage: 'Bad Request',
					message: 'error/not-found',
				});
			}
			else if (err.message === 'error/expired') {
				await deleteRecoveryCodeByUserId(query.id);

				throw createError({
					statusCode: 400,
					statusMessage: 'Bad Request',
					message: 'error/expired',
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
