import argon2 from 'argon2';
import { findUserByUsername } from '~/server/database/user';
import {
  issueTokens,
  setAccessToken,
  setRefreshToken,
} from '~/server/utils/jwt';
import { loginSchema } from '~/schemas/login';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginSchema.parse);

  const user = await findUserByUsername(body.username);
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

  const { password, ...data } = user;

  return data;
});
