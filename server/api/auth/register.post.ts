import { isAfter } from 'date-fns';
import { registerSchema } from '~/schemas/register';
import { createUser, deleteUserById, findUserByEmailOrUsername } from '~/server/database/user';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerSchema.parse);

  const user = await findUserByEmailOrUsername(body.email, body.username);
  if (user) {
    if (user.verified !== null) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'error/user-exists',
      });
    }

    if (user.verificationCode) {
      const expired = isAfter(new Date(), user.verificationCode.expiresIn);

      if (!expired) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: 'error/not-expired',
        });
      }
    }

    await deleteUserById(user.id);
  }

  const newUser = await createUser(body);
  await sendVerificationEmail(newUser.id, newUser.email);
});
