import { isAfter } from 'date-fns';
import { prisma } from '~/server/prisma';

export async function recoverUserPassword(userId: string, newPassword: string, recoveryCode: string) {
	return prisma.$transaction(async (tx) => {
		const user = await tx.user.findUnique({
			where: {
				id: userId,
				recoveryCode: { value: recoveryCode },
			},
			include: { recoveryCode: true },
		});
		if (!user) {
			throw new Error('error/not-found');
		}

		// Code can not be null, since we looked for recoveryCode: { value: recoveryCode }
		const isCodeExpired = isAfter(new Date(), user.recoveryCode!.expiresIn);
		if (isCodeExpired) {
			throw new Error('error/expired');
		}

		await tx.user.update({
			where: { id: user.id },
			data: {
				password: await hashPassword(newPassword),
			},
		});

		await tx.recoveryCode.delete({
			where: { id: user.recoveryCode!.id },
		});
	});
}
