import argon2 from 'argon2';
import { findUserByUsername } from '~/server/database/user';
import {
  issueTokens,
  setAccessToken,
  setRefreshToken,
} from '~/server/utils/jwt';
import { loginSchema } from '~/schemas/login';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const parseResult = loginSchema.safeParse(body);
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors;

    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/body',
      data: errors,
    });
  }

  const user = await findUserByUsername(parseResult.data.username);
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/credentials',
    });
  }

  if (!user.verified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/not-verified',
    });
  }

  const valid = await argon2.verify(user.password, parseResult.data.password);
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
