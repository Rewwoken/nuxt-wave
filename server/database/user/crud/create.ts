import { prisma } from '~/server/database';
import { UserSelect } from '~/server/database/user/options';

export async function createUser(data: RegisterSchema) {
	data.password = await hash(data.password);

	return prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data,
			select: UserSelect,
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
