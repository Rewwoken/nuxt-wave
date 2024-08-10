import { prisma } from '~/server/database';

export async function findProfileByUserId(userId: string) {
	return prisma.profile.findUnique({
		where: { userId },
	});
}
