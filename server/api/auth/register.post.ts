import { isAfter } from 'date-fns';
import { createUser } from '~/server/database/user/crud/create';
import { deleteUserById } from '~/server/database/user/crud/delete';
import { findFirstUser } from '~/server/database/user/crud/read';
import { createVerificationCode } from '~/server/database/verification-code/crud/create';

export default defineEventHandler(async (event) => {
	const { success: successBody, data: body } = await readValidatedBody(event, registerSchema.safeParse);
	if (!successBody) {
		throw serverError(400, 'invalid-body');
	}

	const existingUser = await findFirstUser({
		OR: [{ email: body.email }, { username: body.username }],
	});
	if (existingUser) {
		if (existingUser.verifiedOn !== null) {
			throw serverError(400, 'user-exists');
		}

		// If code has expired, delete unverified user, otherwise throw an error
		const isCodeExpired = isAfter(new Date(), existingUser.verificationCode!.expiresIn);
		if (!isCodeExpired) {
			throw serverError(400, 'not-expired');
		}

		await deleteUserById(existingUser.id);
	}

	const newUser = await createUser(body);

	// TODO: make email verification optional
	const verificationCode = await createVerificationCode(newUser.id);
	await sendVerificationEmail(body.email, newUser.id, verificationCode.value);

	setResponseStatus(event, 201);
	return newUser;
});
