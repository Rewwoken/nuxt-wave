import { isAfter } from 'date-fns';
import { registerSchema } from '~/schemas/auth/register';
import { createUser } from '~/server/database/user/crud/create';
import { deleteUserById } from '~/server/database/user/crud/delete';
import { findFirstUser } from '~/server/database/user/crud/read';
import { createVerificationCode } from '~/server/database/verification-code/crud/create';

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, registerSchema.parse);

	const existingUser = await findFirstUser({
		OR: [{ email: body.email }, { username: body.username }],
	});
	if (existingUser) {
		if (existingUser.verifiedOn !== null) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'error/user-exists',
			});
		}

		// If code has expired, delete unverified user, otherwise throw an error
		const isCodeExpired = isAfter(new Date(), existingUser.verificationCode!.expiresIn);
		if (isCodeExpired) {
			await deleteUserById(existingUser.id);
		}
		else {
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'error/not-expired',
			});
		}
	}

	const newUser = await createUser(body);

	const verificationCode = await createVerificationCode(newUser.id);
	await sendVerificationEmail(newUser.email, newUser.id, verificationCode.value);

	setResponseStatus(event, 201);
	return newUser;
});
