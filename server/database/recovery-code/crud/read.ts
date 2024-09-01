import { prisma } from '~/server/prisma';

export function findRecoveryCodeByUserId(userId: string) {
	return prisma.recoveryCode.findUnique({
		where: { userId },
	});
}
