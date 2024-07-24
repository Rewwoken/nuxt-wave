import type { CreateEmailOptions } from 'resend';
import { Resend } from 'resend';

const config = useRuntimeConfig();
const resend = new Resend(config.resendApiKey);

export async function sendEmail(options: Omit<CreateEmailOptions, 'from'>) {
  return resend.emails.send({
    from: 'Nuxt <onboarding@resend.dev>',
    ...options,
  } as CreateEmailOptions);
}
