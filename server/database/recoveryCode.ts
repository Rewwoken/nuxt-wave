import crypto from 'node:crypto';
import { addMinutes, isAfter } from 'date-fns';
import { prisma } from '~/server/database';

// TODO: handle expiration date
export async function createRecoveryCode(userId: string) {
	return prisma.$transaction(async (tx) => {
		const prevRecoveryCode = await prisma.recoveryCode.findUnique({
			where: { userId },
		});
		if (prevRecoveryCode) {
			const isCodeExpired = isAfter(new Date(), prevRecoveryCode.expiresIn);

			if (!isCodeExpired) {
				throw createError({
					statusCode: 400,
					statusMessage: 'Bad Request',
					message: 'error/not-expired',
				});
			}

			await tx.recoveryCode.delete({
				where: { userId },
			});
		}

		const randomCode = crypto.randomBytes(128).toString('hex');
		const expiresIn = addMinutes(new Date(), 1);

		return tx.recoveryCode.create({
			data: {
				user: {
					connect: { id: userId },
				},
				value: randomCode,
				expiresIn,
			},
			select: {
				value: true,
			},
		});
	});
}

export function findRecoveryCodeByUserId(userId: string) {
	return prisma.recoveryCode.findUnique({
		where: { userId },
	});
}

export async function recoverUserPassword(userId: string, newPassword: string, recoveryCode: string) {
	return prisma.$transaction([
		prisma.user.findUniqueOrThrow({
			where: {
				id: userId,
				recoveryCode: { value: recoveryCode },
			},
		}),
		prisma.user.update({
			where: { id: userId },
			data: {
				password: await hash(newPassword),
			},
		}),
		prisma.recoveryCode.delete({
			where: {
				userId,
				value: recoveryCode,
			},
		}),
	]);
}
