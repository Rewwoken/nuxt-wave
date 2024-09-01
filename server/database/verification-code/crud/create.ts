import { addMinutes } from 'date-fns';
import { prisma } from '~/server/prisma';

export async function createVerificationCode(userId: string) {
	const code = crypto.randomUUID();
	const expiresIn = addMinutes(new Date(), 15);

	// The previous code is handled in register.post.ts, so there's no need to check it

	return prisma.verificationCode.create({
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
