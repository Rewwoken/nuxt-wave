import { prisma } from '~/server/prisma';

export async function blockUser(userId: string, userIdToBlock: string) {
	return await prisma.blockRelation.create({
		data: {
			initiatorUser: {
				connect: { id: userId },
			},
			blockedUser: {
				connect: { id: userIdToBlock },
			},
		},
		select: {
			initiatorUserId: true,
			blockedUserId: true,
			createdAt: true,
		},
	});
}

export async function unBlockUser(userId: string, userIdToUnBlock: string) {
	return await prisma.blockRelation.delete({
		where: {
			initiatorUserId_blockedUserId: {
				initiatorUserId: userId,
				blockedUserId: userIdToUnBlock,
			},
		},
		select: {
			initiatorUserId: true,
			blockedUserId: true,
			createdAt: true,
		},
	});
}

export async function checkBlocking(userId: string, userIdToCheck: string) {
	const relation = await prisma.blockRelation.findUnique({
		where: {
			initiatorUserId_blockedUserId: {
				initiatorUserId: userId,
				blockedUserId: userIdToCheck,
			},
		},
		select: {
			initiatorUserId: true,
			blockedUserId: true,
			createdAt: true,
		},
	});

	return Boolean(relation);
}
