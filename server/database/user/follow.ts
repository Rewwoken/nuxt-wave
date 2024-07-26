import { prisma } from '~/server/database/index';

export function followUser(userId: string, userIdToFollow: string) {
  return prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        follows: {
          connect: { id: userIdToFollow },
        },
      },
    }),
    prisma.user.update({
      where: { id: userIdToFollow },
      data: {
        followers: {
          connect: { id: userId },
        },
      },
    }),
  ]);
}

export async function checkFollowing(userId: string, userIdToCheck: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      follows: {
        some: { id: userIdToCheck },
      },
    },
  });

  return Boolean(user);
}

export function unFollowUser(userId: string, userIdToUnFollow: string) {
  return prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        follows: {
          disconnect: { id: userIdToUnFollow },
        },
      },
    }),
    prisma.user.update({
      where: { id: userIdToUnFollow },
      data: {
        followers: {
          disconnect: { id: userId },
        },
      },
    }),
  ]);
}
