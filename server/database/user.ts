import argon2 from 'argon2';
import { prisma } from '~/server/database';

export async function createUser(data: any) {
	data.password = await argon2.hash(data.password);

	const { password, ...user } = await prisma.user.create({ data });

	return user;
}

export async function findUser(username: string) {
	return await prisma.user.findUnique({ where: { username } });
}
