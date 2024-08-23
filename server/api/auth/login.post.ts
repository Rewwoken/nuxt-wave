import argon2 from 'argon2';
import { prisma } from '~/server/database';

export default defineEventHandler(async (event) => {
	const body = await readValidatedBody(event, loginSchema.parse);

	const user = await prisma.user.findUnique({
		where: { username: body.username },
		select: {
			id: true,
			verifiedOn: true,
			password: true,
		},
	});

	if (!user) {
		throw serverError(400, 'credentials');
	}

	if (user.verifiedOn === null) {
		throw serverError(400, 'not-verified');
	}

	const valid = await argon2.verify(user.password, body.password);
	if (!valid) {
		throw serverError(400, 'credentials');
	}

	const { accessToken, refreshToken } = issueTokens(user.id);
	setRefreshToken(event, refreshToken);
	setAccessToken(event, accessToken);

	return { id: user.id };
});
