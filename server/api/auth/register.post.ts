import { registerSchema } from '~/schemas/register';
import { createUser, findUserByEmailOrUsername } from '~/server/database/user/user';
import { createVerificationCode } from '~/server/database/verificationCode';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerSchema.parse);

  const existingUser = await findUserByEmailOrUsername(body.email, body.username);
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/exist',
    });
  }

  const user = await createUser(body);
  const verificationCode = await createVerificationCode(user.id);

  const config = useRuntimeConfig();
  const verificationLink = `${config.public.baseUrl}/auth/verification?id=${user.id}&code=${verificationCode.value}`;

  // TODO: add more information
  await sendEmail({
    to: user.email,
    subject: 'Email verification',
    html: `<p>Please, click <a href="${verificationLink}" target="_blank">here</a>.</p>`,
  });

  setResponseStatus(event, 201);
});
