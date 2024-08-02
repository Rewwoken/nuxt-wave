import { registerSchema } from '~/schemas/register';
import { findUserByEmail } from '~/server/database/user';
import { createRecoveryCode } from '~/server/database/recoveryCode';

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, registerSchema.pick({
		email: true,
	}).parse);

	const user = await findUserByEmail(body.email);
	if (!user) {
		return void 0;
	}

	try {
		const code = await createRecoveryCode(user.id);
		await sendRecoveryEmail(body.email, user.id, code.value);
	}
	catch (err) {
		if (err instanceof Error) {
			if (err.message === 'error/not-expired') {
				throw createError({
					statusCode: 400,
					statusMessage: 'Bad Request',
					message: 'error/not-expired',
				});
			}
			else {
				throw createError({
					statusCode: 400,
					statusMessage: 'Bad Request',
					message: 'error/unknown',
				});
			}
		}
		else {
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'error/unknown',
			});
		}
	}
});
