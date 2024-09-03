import { addMinutes } from 'date-fns';
import { prisma } from '~/server/prisma';

export async function createVerificationCode(userId: string) {
	const code = crypto.randomUUID();
	const expiresIn = addMinutes(new Date(), 15);

	return await prisma.verificationCode.create({
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
