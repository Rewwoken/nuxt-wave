import argon2 from 'argon2';
import { loginSchema } from '~/schemas/login';
import { prisma } from '~/server/database';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginSchema.parse);

  const user = await prisma.user.findUnique({
    where: { username: body.username },
    select: {
      id: true,
      verified: true,
      password: true,
    },
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/credentials',
    });
  }

  if (user.verified === null) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/not-verified',
    });
  }

  const valid = await argon2.verify(user.password, body.password);
  if (!valid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/credentials',
    });
  }

  const { accessToken, refreshToken } = issueTokens(user.id);
  setRefreshToken(event, refreshToken);
  setAccessToken(event, accessToken);
});
