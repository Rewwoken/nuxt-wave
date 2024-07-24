import type { Prisma } from '@prisma/client';
import type { RegisterSchema } from '~/schemas/register';
import { prisma } from '~/server/database';
import { hash } from '~/server/utils/hash';
import { createProfile } from '~/server/database/profile';

export async function createUser(data: RegisterSchema) {
  data.password = await hash(data.password);

  const user = await prisma.user.create({ data });
  const profile = await createProfile(user.id, user.email);

  return { ...user, profile };
}

const select: Prisma.UserSelect = {
  id: true,
  username: true,
  password: true,
  profile: true,
  createdAt: true,
  updatedAt: true,
};

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
    select,
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select,
  });
}

export async function findUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select,
  });

  if (!user) {
    throw new Error('User not found!');
  }

  return { ...user, profile: user.profile! };
}

export async function findUserByEmailOrUsername(email: string, username: string) {
  return prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username },
      ],
    },
    select,
  });
}

export async function updateUser(userId: string, data: Partial<RegisterSchema>) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
}
