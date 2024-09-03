import { deleteRecoveryCodeByUserId } from '~/server/database/recovery-code/crud/delete';
import { recoverUserPassword } from '~/server/database/recovery-code/recover';

export default defineEventHandler(async (event) => {
	const { success: successQuery, data: query } = await getValidatedQuery(event, codeSchema.safeParse);
	if (!successQuery) {
		throw serverError(400, 'invalid-query');
	}

	const { success: successBody, data: body } = await readValidatedBody(event, recoverySchema.safeParse);
	if (!successBody) {
		throw serverError(400, 'invalid-body');
	}

	try {
		return await recoverUserPassword(query.id, body.password, query.code);
	}
	catch (err) {
		console.error('Error recovering user password', err);

		if (err instanceof Error) {
			if (err.message === 'error/not-found') {
				throw serverError(404, 'not-found');
			}
			else if (err.message === 'error/expired') {
				await deleteRecoveryCodeByUserId(query.id);

				throw serverError(400, 'expired');
			}
		}

		throw serverError();
	}
});
