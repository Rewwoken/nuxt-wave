import { Resend } from 'resend';

const config = useRuntimeConfig();
const resend = new Resend(config.resendApiKey);

export async function sendVerificationEmail(email: string, userId: string, code: string) {
	const verificationLink = `${config.public.baseUrl}/auth/verification?id=${userId}&code=${code}`;

	await resend.emails.send({
		from: 'Acme <onboarding@resend.dev>',
		to: email,
		subject: 'Email verification',
		html: `<p>Please, click <a href="${verificationLink}" target="_blank">here</a>.</p>`,
	});
}

// TODO: refactor
export async function sendRecoveryEmail(email: string, userId: string, code: string) {
	const recoveryLink = `${config.public.baseUrl}/auth/recovery?id=${userId}&code=${code}`;

	await resend.emails.send({
		from: 'Acme <onboarding@resend.dev>',
		to: email,
		subject: 'Password recovery',
		html: `<p>Please, click <a href="${recoveryLink}" target="_blank">here</a>.</p>`,
	});
}
