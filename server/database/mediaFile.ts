import { prisma } from '~/server/database';

export async function createMediaFile(
  userId: string,
  postId: string,
  mediaFileData: any,
) {
  return prisma.mediaFile.create({
    data: {
      ...mediaFileData,
      user: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
    select: {
      url: true,
    },
  });
}
