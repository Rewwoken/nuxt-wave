import { prisma } from '~/server/prisma';

export async function createUser(data: RegisterSchema) {
	data.password = await hashPassword(data.password);

	return await prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data,
			select: { id: true },
		});

		await tx.profile!.create({
			data: {
				user: {
					connect: { id: user.id },
				},
				name: `User${(Math.random() * 10000).toFixed(0)}`, // Random name like User1234
			},
		});

		return user;
	});
}
