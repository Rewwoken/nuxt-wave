import { z } from 'zod';
import { isUsername } from '~/schemas/register';
import { findUserByUsername } from '~/server/database/user';

export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, 'username');

  const usernameParse = z.string().regex(isUsername).safeParse(username);
  if (!usernameParse.success) {
    throw createError({
      statusCode: 400,
      message: 'error/invalid',
    });
  }

  const findUser = await findUserByUsername(usernameParse.data);
  if (!findUser) {
    throw createError({
      statusCode: 400,
      message: 'error/not-found',
    });
  }

  const { password, ...user } = findUser;

  return {
    ...user,
    editAccess: event.context.userId === user.id,
  };
});
