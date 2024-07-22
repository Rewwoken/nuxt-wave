import argon2 from 'argon2';
import { prisma } from '~/server/database';
import type { RegisterSchema } from '~/schemas/register';

export async function createUser(data: RegisterSchema) {
  data.password = await argon2.hash(data.password);

  const user = await prisma.user.create({ data });
  const profile = await prisma.profile.create({
    data: {
      name: data.email.split('@')[0],
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return Object.assign(user, { profile });
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}

export async function findUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    // include: {
    //   profile: true,
    // },
    select: {
      id: true,
      username: true,
      password: true,
      profile: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error('User not found!');
  }

  const profile = user.profile!;

  return { ...user, profile };
}
