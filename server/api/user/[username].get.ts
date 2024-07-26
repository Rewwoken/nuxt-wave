import { z } from 'zod';
import { isUsername } from '~/schemas/register';
import { findUserByUsername } from '~/server/database/user/user';

export default defineEventHandler(async (event) => {
  const { username } = await getValidatedRouterParams(event, z.object({
    username: z.string().regex(isUsername),
  }).parse);

  const findUser = await findUserByUsername(username);
  if (!findUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/not-found',
    });
  }

  const { password, ...user } = findUser;

  return user;
});
