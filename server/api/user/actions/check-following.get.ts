import { z } from 'zod';
import { checkFollowing } from '~/server/database/user/follow';

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, z.object({
    id: z.string(),
  }).parse);

  const id = event.context.userId;
  return checkFollowing(id, query.id);
});
