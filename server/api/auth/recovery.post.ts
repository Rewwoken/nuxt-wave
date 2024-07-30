import { recoverUserPassword } from '~/server/database/recoveryCode';
import { registerSchema } from '~/schemas/register';
import { codeSchema } from '~/schemas/code';

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, codeSchema.parse);
  const body = await readValidatedBody(event, registerSchema.pick({ password: true }).parse);

  try {
    await recoverUserPassword(query.id, body.password, query.code);
  }
  catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/not-found',
    });
  }
});
