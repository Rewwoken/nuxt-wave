import { registerSchema } from '~/schemas/register';
import { findUserByEmail } from '~/server/database/user';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerSchema.pick({ email: true }).parse);

  const user = await findUserByEmail(body.email);
  if (!user) {
    return;
  }

  await sendRecoveryEmail(user.id, body.email);
});
