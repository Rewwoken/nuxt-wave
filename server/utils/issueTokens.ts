import jwt from 'jsonwebtoken';

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
