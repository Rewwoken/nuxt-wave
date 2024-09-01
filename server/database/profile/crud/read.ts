import { prisma } from '~/server/prisma';

export async function findProfileByUserId(userId: string) {
	return prisma.profile.findUnique({
		where: { userId },
	});
}
