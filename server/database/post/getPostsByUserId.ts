import { prisma } from '~/server/database';

interface Options {
  skip: number;
  take: number;
}
export function getPostsByUserId(userId: string, options: Options) {
  return prisma.post.findMany({
    where: {
      user: { id: userId },
    },
    skip: options.skip,
    take: options.take,
    select: {
      id: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      parentPost: {
        select: {
          id: true,
          text: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      mediaFiles: {
        select: {
          id: true,
          url: true,
        },
      },
      _count: {
        select: {
          replies: true,
          mediaFiles: true,
        },
      },
    },
  });
}
