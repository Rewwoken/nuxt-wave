import { prisma } from '~/server/database';

export async function createUser(data: RegisterSchema) {
	data.password = await hash(data.password);

	return prisma.$transaction(async (tx) => {
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
