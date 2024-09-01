import { prisma } from '~/server/prisma';

export function followUser(initiatorUserId: string, userIdToFollow: string) {
	return prisma.followRelation.create({
		data: {
			initiatorUser: {
				connect: { id: initiatorUserId },
			},
			followedUser: {
				connect: { id: userIdToFollow },
			},
		},
		select: {
			initiatorUserId: true,
			followedUserId: true,
			createdAt: true,
		},
	});
}

export function unFollowUser(initiatorUserId: string, userIdToUnFollow: string) {
	return prisma.followRelation.delete({
		where: {
			initiatorUserId_followedUserId: {
				initiatorUserId,
				followedUserId: userIdToUnFollow,
			},
		},
		select: {
			initiatorUserId: true,
			followedUserId: true,
			createdAt: true,
		},
	});
}

export async function checkFollowing(initiatorUserId: string, userIdToCheck: string) {
	const relation = await prisma.followRelation.findUnique({
		where: {
			initiatorUserId_followedUserId: {
				initiatorUserId,
				followedUserId: userIdToCheck,
			},
		},
		select: {
			initiatorUserId: true,
			followedUserId: true,
			createdAt: true,
		},
	});

	return Boolean(relation);
}
