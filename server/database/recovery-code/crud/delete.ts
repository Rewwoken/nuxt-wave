import { prisma } from '~/server/prisma';

export async function deleteRecoveryCodeByUserId(userId: string) {
	return await prisma.recoveryCode.delete({
		where: { userId },
	});
}
