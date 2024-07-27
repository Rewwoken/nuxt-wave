import { findUserById } from '~/server/database/user';

export default defineEventHandler((event) => {
  return findUserById(event.context.userId);
});
