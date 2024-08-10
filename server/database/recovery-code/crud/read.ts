import { prisma } from '~/server/database';

export function findRecoveryCodeByUserId(userId: string) {
	return prisma.recoveryCode.findUnique({
		where: { userId },
	});
}
