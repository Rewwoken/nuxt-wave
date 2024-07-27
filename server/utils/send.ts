import { Resend } from 'resend';
import { createVerificationCode } from '~/server/database/verificationCode';
import { createRecoveryCode } from '~/server/database/recoveryCode';

const config = useRuntimeConfig();
const resend = new Resend(config.resendApiKey);

export async function sendVerificationEmail(userId: string, email: string) {
  const verificationCode = await createVerificationCode(userId);

  const config = useRuntimeConfig();
  const verificationLink = `${config.public.baseUrl}/auth/verification?id=${userId}&code=${verificationCode.value}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Email verification',
    html: `<p>Please, click <a href="${verificationLink}" target="_blank">here</a>.</p>`,
  });
}

export async function sendRecoveryEmail(userId: string, email: string) {
  const recoveryCode = await createRecoveryCode(userId);

  const config = useRuntimeConfig();
  const recoveryLink = `${config.public.baseUrl}/auth/recovery?id=${userId}&code=${recoveryCode.value}`;

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Password recovery',
    html: `<p>Please, click <a href="${recoveryLink}" target="_blank">here</a>.</p>`,
  });
}
