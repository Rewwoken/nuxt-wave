import { createUser } from '~/server/database/user';

interface RegisterBody {
  name: string;
  username: string;
  image: string;
  password: string;
}
export default defineEventHandler(async (event) => {
  const body: RegisterBody = await readBody(event);

  const { username, password } = body;
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: 'Invalid data!',
    });
  }

  await createUser(body);

  setResponseStatus(event, 201);
});
