import { recoverySchema } from '~/schemas/auth/recovery';
import { deleteRecoveryCodeByUserId } from '~/server/database/recovery-code/crud/delete';
import { recoverUserPassword } from '~/server/database/recovery-code/recover';
import { codeSchema } from '~/server/schemas/code';

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
