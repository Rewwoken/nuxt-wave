import { prisma } from '~/server/database';

export function followUser(userId: string, userIdToFollow: string) {
	return prisma.followRelation.create({
		data: {
			initiatorUser: {
				connect: { id: userId },
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

export function unFollowUser(userId: string, userIdToUnFollow: string) {
	return prisma.followRelation.delete({
		where: {
			initiatorUserId_followedUserId: {
				initiatorUserId: userId,
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

export async function checkFollowing(userId: string, userIdToCheck: string) {
	const relation = await prisma.followRelation.findUnique({
		where: {
			initiatorUserId_followedUserId: {
				initiatorUserId: userId,
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
