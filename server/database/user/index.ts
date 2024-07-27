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
      },
    );

    await tx.profile.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        name: `User${(Math.random() * 10000).toFixed(0)}`,
      },
    });

    return user;
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUniqueOrThrow({
    where: { id },
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
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
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
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
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
}

// Used in /api/auth/register.post.ts
export async function findUserByEmailOrUsername(email: string, username: string) {
  return prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
    select: {
      id: true,
      email: true,
      verified: true,
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
