import { prisma } from '~/server/prisma';

export async function findProfileByUserId(userId: string) {
	return await prisma.profile.findUnique({
		where: { userId },
	});
}
