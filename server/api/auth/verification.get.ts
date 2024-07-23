import { z } from 'zod';
import { prisma } from '~/server/database';

export default defineEventHandler(async (event) => {
  const params = await getValidatedQuery(event, z.object({
    id: z.string(),
    code: z.string(),
  }).parse);

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: params.id,
          verificationCode: { value: params.code },
        },
        data: {
          verified: new Date(),
        },
      }),
      prisma.verificationCode.delete({
        where: {
          value: params.code,
        },
      }),
    ]);
  }
  catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/not-found',
    });
  }
});
