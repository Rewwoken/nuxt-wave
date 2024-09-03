import { isAfter } from 'date-fns';
import { prisma } from '~/server/prisma';

export async function verifyUser(userId: string, verificationCode: string) {
	return await prisma.$transaction(async (tx) => {
		const user = await tx.user.findUnique({
			where: {
				id: userId,
				verifiedOn: null,
				verificationCode: { value: verificationCode },
			},
			select: {
				id: true,
				verificationCode: true,
			},
		});
		if (!user) {
			throw new Error('error/not-found');
		}

		// Code can not be null, since we looked for verificationCode: { value: verificationCode }
		const isCodeExpired = isAfter(new Date(), user.verificationCode!.expiresIn);
		if (isCodeExpired) {
			throw new Error('error/expired');
		}

		await tx.user.update({
			where: {
				id: user.id,
			},
			data: {
				verifiedOn: new Date(),
			},
		});

		await tx.verificationCode.delete({
			where: { userId: user.id },
		});
	});
}
