import { prisma } from '~/server/database';

export function followUser(userId: string, userIdToFollow: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      follows: {
        connect: { id: userIdToFollow },
      },
    },
  });
}

export function unFollowUser(userId: string, userIdToUnFollow: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      follows: {
        disconnect: { id: userIdToUnFollow },
      },
    },
  });
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
