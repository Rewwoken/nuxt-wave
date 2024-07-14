import { prisma } from '~/server/database';

export async function getPost(id: string | undefined) {
  if (!id) {
    return null;
  }

  return await prisma.post.findUnique({
    where: { id },
  });
}

export async function createPost(authorId: string, replyToId: string | undefined, postData: any) {
  const replyToOptions = {
    connect: {
      id: replyToId as string,
    },
  };

  return await prisma.post.create({
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
