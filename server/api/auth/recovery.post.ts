import { codeSchema } from '~/schemas/auth/code';
import { deleteRecoveryCodeByUserId } from '~/server/database/recovery-code/crud/delete';
import { recoverUserPassword } from '~/server/database/recovery-code/recover';

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
