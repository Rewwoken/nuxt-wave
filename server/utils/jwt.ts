import jwt from 'jsonwebtoken';
import type { H3Event } from 'h3';
import { addMinutes, addMonths } from 'date-fns';

interface Payload {
	id: string;
}

export function issueAccessToken(id: string) {
	const config = useRuntimeConfig();
	const payload: Payload = { id };

	return jwt.sign(payload, config.jwtSecret, {
		expiresIn: '10m', // 10 minutes
	});
}

export function issueRefreshToken(id: string) {
	const config = useRuntimeConfig();
	const payload: Payload = { id };

	return jwt.sign(payload, config.jwtSecret, {
		expiresIn: '184d', // 6 months
	});
}

export function issueTokens(id: string) {
	return {
		accessToken: issueAccessToken(id),
		refreshToken: issueRefreshToken(id),
	};
}

export function verifyToken(value: string | undefined) {
	if (!value) {
		return false;
	}

	const config = useRuntimeConfig();
	try {
		jwt.verify(value, config.jwtSecret);
		return true;
	}
	catch {
		return false;
	}
}

export function decodeToken(value: string) {
	return jwt.decode(value) as Payload;
}

export function setAccessToken(event: H3Event, value: string) {
	const expires = addMinutes(new Date(), 10);

	setCookie(event, 'accessToken', value, {
		httpOnly: false,
		sameSite: 'lax',
		secure: true,
		expires,
	});
}

export function setRefreshToken(event: H3Event, value: string) {
	const expires = addMonths(new Date(), 6);

	setCookie(event, 'refreshToken', value, {
		httpOnly: true,
		sameSite: 'lax',
		secure: true,
		expires,
	});
}
