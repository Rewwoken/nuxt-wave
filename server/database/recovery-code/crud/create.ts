import { addMinutes } from 'date-fns';
import { prisma } from '~/server/database';

export async function createRecoveryCode(userId: string) {
	const code = crypto.randomUUID();
	const expiresIn = addMinutes(new Date(), 10);

	return prisma.recoveryCode.create({
		data: {
			user: {
				connect: { id: userId },
			},
			value: code,
			expiresIn,
		},
		select: {
			value: true,
		},
	});
}
