import { registerSchema } from '~/schemas/register';
import { findUserByUsername } from '~/server/database/user';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const parseResult = registerSchema.safeParse(body);
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors;

    throw createError({
      statusCode: 400,
      message: 'Invalid data passed!',
      data: errors,
    });
  }

  const existingUser = await findUserByUsername(parseResult.data.username);
  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: 'Username already exists!',
    });
  }

  // await createUser(body);

  setResponseStatus(event, 201);
});
