import { findUserById } from '~/server/database/user';

export default defineEventHandler(async (event) => {
  const result = await findUserById(event.context.userId);

  const { password, ...user } = result!;

  return user;
});
