import { z } from 'zod';
import { getPostsByUserId } from '~/server/database/post/getPostsByUserId';

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, z.object({
    userId: z.string(),
    skip: z.number().min(0),
    take: z.number().min(1).max(10),
  }).parse);

  return getPostsByUserId(query.userId, {
    skip: query.skip,
    take: query.take,
  });
});
