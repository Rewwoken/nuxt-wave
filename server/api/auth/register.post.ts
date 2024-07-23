import { registerSchema } from '~/schemas/register';
import { createUser, findUserByEmailOrUsername } from '~/server/database/user';
import { createVerificationCode } from '~/server/database/verificationCode';
import { sendEmail } from '~/server/utils/sendEmail';

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

  const user = await createUser(body);
  const verificationCode = await createVerificationCode(user.id);

  const config = useRuntimeConfig();
  const verificationLink = `${config.baseUrl}/auth/verification?id=${user.id}&code=${verificationCode.value}`;

  // TODO: add more information
  await sendEmail({
    from: 'Nuxt <onboarding@resend.dev>',
    to: user.email,
    subject: 'Email verification',
    html: `<p>Please, click <a href="${verificationLink}" target="_blank">here</a>.</p>`,
  });

  setResponseStatus(event, 201);
});
