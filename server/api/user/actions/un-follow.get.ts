import { z } from 'zod';
import { unFollowUser } from '~/server/database/user/follow';

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, z.object({
    id: z.string(),
  }).parse);

  const userId = event.context.userId;
  try {
    await unFollowUser(userId, query.id);
  }
  catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/un-follow',
    });
  }
});
