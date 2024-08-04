import { addMinutes, isAfter } from 'date-fns';
import { prisma } from '~/server/database';

export async function createRecoveryCode(userId: string) {
	const code = crypto.randomUUID();
	const expiresIn = addMinutes(new Date(), 10);

	return prisma.recoveryCode.create({
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

export function findRecoveryCodeByUserId(userId: string) {
	return prisma.recoveryCode.findUnique({
		where: { userId },
	});
}

export function deleteRecoveryCodeByUserId(userId: string) {
	return prisma.recoveryCode.delete({
		where: { userId },
	});
}

export async function recoverUserPassword(userId: string, newPassword: string, recoveryCode: string) {
	return prisma.$transaction(async (tx) => {
		const user = await tx.user.findUnique({
			where: {
				id: userId,
				recoveryCode: { value: recoveryCode },
			},
			select: {
				id: true,
				recoveryCode: {
					select: {
						id: true,
						expiresIn: true,
					},
				},
			},
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
				password: await hash(newPassword),
			},
		});

		await tx.recoveryCode.delete({
			where: { id: user.recoveryCode!.id },
		});

		return user;
	});
}
