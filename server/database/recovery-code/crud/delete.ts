import { prisma } from '~/server/prisma';

export function deleteRecoveryCodeByUserId(userId: string) {
	return prisma.recoveryCode.delete({
		where: { userId },
	});
}
