import { isAfter } from 'date-fns';
import { prisma } from '~/server/database';
import { createRecoveryCode } from '~/server/database/recovery-code/crud/create';
import { deleteRecoveryCodeByUserId } from '~/server/database/recovery-code/crud/delete';

// ! This route should not return or throw anything to avoid leaking information about the user's email.
// ! Information about the user's email should be kept confidential.
export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, requestRecoverySchema.parse);

	try {
		const user = await prisma.user.findUniqueOrThrow({
			where: { email: body.email },
			select: {
				id: true,
				recoveryCode: true,
			},
		});

		if (user.recoveryCode) {
			const isCodeExpired = isAfter(new Date(), user.recoveryCode.expiresIn);

			if (!isCodeExpired) {
				return void 0;
			}

			await deleteRecoveryCodeByUserId(user.id);
		}

		const code = await createRecoveryCode(user.id);
		await sendRecoveryEmail(body.email, user.id, code.value);
	}
	catch {
		return void 0;
	}
});
