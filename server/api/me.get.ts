import { findUserById } from '~/server/database/user';

export default defineEventHandler(async (event) => {
  const result = await findUserById(event.context.userId);

  if (!result) {
    return null;
  }

  const { password, ...user } = result;

  return user;
});
