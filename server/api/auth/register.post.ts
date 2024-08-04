import { isAfter } from 'date-fns';
import { registerSchema } from '~/schemas/register';
import { createUser, deleteUserById, findUserByEmailOrUsername } from '~/server/database/user';
import { createVerificationCode } from '~/server/database/verificationCode';

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, registerSchema.parse);

	const existingUser = await findUserByEmailOrUsername(body.email, body.username);
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
