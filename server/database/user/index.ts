import type { Prisma } from '@prisma/client';
import type { RegisterSchema } from '~/schemas/register';
import { prisma } from '~/server/database';

export async function createUser(data: RegisterSchema) {
	data.password = await hash(data.password);

	return prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data,
			select: {
				id: true,
				email: true,
				username: true,
			},
		});

		await tx.profile.create({
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

export async function findUniqueUser(where: Prisma.UserWhereUniqueInput) {
	const user = await prisma.user.findUnique({
		where,
		select: {
			id: true,
			username: true,
			createdAt: true,
			profile: {
				select: {
					name: true,
					bio: true,
					location: true,
					website: true,
					imageUrl: true,
					bannerUrl: true,
				},
			},
		},
	});

	if (!user || !user.profile) {
		return null;
	}

	// Forcing profile to be NonNullable because the profile is created in prisma.$transaction alongside user creation
	return { ...user, profile: user.profile };
}

// Used in /api/auth/register.post.ts
export async function findFirstUser(where: Prisma.UserWhereInput) {
	return prisma.user.findFirst({
		where,
		select: {
			id: true,
			email: true,
			verifiedOn: true,
			verificationCode: true,
		},
	});
}

export async function updateUser(userId: string, data: Prisma.UserUpdateInput) {
	return prisma.user.update({
		where: {
			id: userId,
		},
		data,
	});
}

export async function deleteUserById(userId: string) {
	return prisma.user.delete({
		where: {
			id: userId,
		},
	});
}
