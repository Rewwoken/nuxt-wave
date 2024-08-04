import { addMinutes, isAfter } from 'date-fns';
import { prisma } from '~/server/database';

export async function createVerificationCode(userId: string) {
	const code = crypto.randomUUID();
	const expiresIn = addMinutes(new Date(), 15);

	// The previous code is handled in register.post.ts, so there's no need to check it

	return prisma.verificationCode.create({
		data: {
			user: {
				connect: { id: userId },
			},
			value: code,
			expiresIn,
		},
		select: {
			value: true,
		},
	});
}

export async function verifyUser(userId: string, verificationCode: string) {
	return prisma.$transaction(async (tx) => {
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
