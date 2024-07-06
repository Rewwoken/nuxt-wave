import { prisma } from '~/server/database';

export function createRefreshToken(userId: string, value: string) {
	return prisma.refreshToken.create({
		data: {
			value,
			user: { connect: { id: userId } },
		},
	});
}
