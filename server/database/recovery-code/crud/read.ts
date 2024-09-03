import { prisma } from '~/server/prisma';

export async function findRecoveryCodeByUserId(userId: string) {
	return await prisma.recoveryCode.findUnique({
		where: { userId },
	});
}
