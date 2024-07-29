import { z } from 'zod';
import { createPost } from '~/server/database/post';

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, z.object({
    replyToId: z.string().optional(),
  }).parse);

  const { fields, files } = await parseForm(event.node.req);

  const userId = event.context.userId;
  try {
    event.node.res.statusCode = 201;
    return await createPost(userId, query.replyToId, fields, files);
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'error/unknown',
    });
  }
});
