import { prisma } from '~/server/database';

// TODO: specify select
export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);

  return prisma.post.findUnique({
    where: { id: params.id },
    // select: {
    //   mediaFiles: true,
    //   replies: true,
    //   parentPost: true,
    // },
  });
});
