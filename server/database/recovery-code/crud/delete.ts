import { prisma } from '~/server/database';

export function deleteRecoveryCodeByUserId(userId: string) {
	return prisma.recoveryCode.delete({
		where: { userId },
	});
}
