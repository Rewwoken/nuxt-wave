import type { Prisma } from '@prisma/client';
import type { RegisterSchema } from '~/schemas/register';
import { prisma } from '~/server/database/index';
import { createProfile } from '~/server/database/profile';

export async function createUser(data: RegisterSchema) {
  data.password = await hash(data.password);

  const user = await prisma.user.create({ data });
  const profile = await createProfile(user.id, user.email);

  return { ...user, profile };
}

export async function findUserById(id: string) {
  return prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      profile: true,
    },
  });
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
    include: {
      profile: true,
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
    },
  });
}

export async function findUserByEmailOrUsername(email: string, username: string) {
  return prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username },
      ],
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
