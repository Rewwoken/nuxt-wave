import jwt from 'jsonwebtoken';
import type { H3Event } from 'h3';

export function issueTokens(id: string) {
	const payload = { id };

	const config = useRuntimeConfig();
	const accessToken = jwt.sign(payload, config.jwtSecret, {
		expiresIn: '10m',
	});
	const refreshToken = jwt.sign(payload, config.jwtSecret, {
		expiresIn: '30d',
	});

	return { accessToken, refreshToken };
}

export function setRefreshToken(event: H3Event, value: string) {
	const expires = new Date();
	expires.setDate(expires.getDate() + 30);

	setCookie(event, 'refreshToken', value, {
		httpOnly: true,
		sameSite: true,
		expires,
	});
}

export function setAccessToken(event: H3Event, value: string) {
	const expires = new Date();
	expires.setMinutes(expires.getMinutes() + 10);

	setCookie(event, 'accessToken', value, {
		httpOnly: false,
		sameSite: true,
		expires,
	});
}

const config = useRuntimeConfig();
export function verifyToken(value: string) {
	try {
		jwt.verify(value, config.jwtSecret);

		return true;
	}
	catch (error) {
		return false;
	}
}

interface JwtPayload {
	id: string;
}
export function decodeToken(value: string) {
	return jwt.decode(value) as JwtPayload;
}
