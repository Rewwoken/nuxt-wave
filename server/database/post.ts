import { prisma } from '~/server/database';

// TODO: return less sensitive data
export async function getPost(id: string | undefined) {
  if (!id) {
    return null;
  }

  return prisma.post.findUnique({
    where: { id },
    include: {
      replyTo: true,
      replies: true,
      mediaFiles: true,
    },
  });
}

export async function createPost(
  authorId: string,
  replyToId: string | undefined,
  postData: any,
) {
  const replyToOptions = {
    connect: {
      id: replyToId as string,
    },
  };

  return prisma.post.create({
    data: {
      ...postData,
      author: {
        connect: {
          id: authorId,
        },
      },
      replyTo: replyToId ? replyToOptions : undefined,
    },
  });
}
