import { registerSchema } from '~/schemas/register';
import { createRecoveryCode } from '~/server/database/recoveryCode';
import { findUserByEmail } from '~/server/database/user/user';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerSchema.pick({ email: true }).parse);

  const user = await findUserByEmail(body.email);
  if (!user) {
    return;
  }

  const recoveryCode = await createRecoveryCode(user.id);

  const config = useRuntimeConfig();
  const recoveryLink = `${config.public.baseUrl}/auth/recovery?id=${user.id}&code=${recoveryCode.value}`;

  await sendEmail({
    to: body.email,
    subject: 'Password recovery',
    html: `<p>Please, click <a href="${recoveryLink}" target="_blank">here</a>.</p>`,
  });
});
