import { findUserById } from '~/server/database/user/user';

export default defineEventHandler(async (event) => {
  const { password, ...user } = await findUserById(event.context.userId);

  return user;
});
