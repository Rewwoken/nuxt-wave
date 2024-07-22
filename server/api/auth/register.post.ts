import { registerSchema } from '~/schemas/register';
import { createUser, findUserByEmailOrUsername } from '~/server/database/user';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const parseResult = registerSchema.safeParse(body);
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors;

    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/body',
      data: errors,
    });
  }

  const existingUser = await findUserByEmailOrUsername(parseResult.data.email, parseResult.data.username);
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/exist',
    });
  }

  await createUser(body);

  setResponseStatus(event, 201);
});
