import { isAfter } from 'date-fns';
import { createRecoveryCode } from '~/server/database/recovery-code/crud/create';
import { deleteRecoveryCodeByUserId } from '~/server/database/recovery-code/crud/delete';
import { findUserByEmail } from '~/server/database/user/crud/read';

// ! This route should always return 204 (no content),
// ! to avoid leaking information about the user's email.
// ! Information about the user's email should be kept confidential.
export default defineEventHandler(async (event) => {
	const { success, data: body } = await readValidatedBody(event, sendRecoverySchema.safeParse);
	if (!success) {
		throw serverError(400, 'invalid-body');
	}

	try {
		const user = await findUserByEmail(body.email);
		if (!user) {
			return;
		}

		if (user.recoveryCode) {
			const isCodeExpired = isAfter(new Date(), user.recoveryCode.expiresIn);

			if (!isCodeExpired) {
				return;
			}

			await deleteRecoveryCodeByUserId(user.id);
		}

		const code = await createRecoveryCode(user.id);
		await sendRecoveryEmail(body.email, user.id, code.value);
	}
	catch (err) {
		console.error('Error recovering sending password recover:', err);
	}
});
