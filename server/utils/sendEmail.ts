import type { CreateEmailOptions } from 'resend';
import { Resend } from 'resend';

const config = useRuntimeConfig();
const resend = new Resend(config.resendApiKey);

export async function sendEmail(options: CreateEmailOptions) {
  return resend.emails.send(options);
}
