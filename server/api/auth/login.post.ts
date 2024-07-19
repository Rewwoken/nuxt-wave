import argon2 from 'argon2';
import { findUserByUsername } from '~/server/database/user';
import {
  issueTokens,
  setAccessToken,
  setRefreshToken,
} from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await findUserByUsername(body.username);

  if (!user) {
    throw createError({
      statusCode: 400,
      message: 'Invalid credentials!',
    });
  }

  const valid = await argon2.verify(user.password, body.password);
  if (!valid) {
    throw createError({
      statusCode: 400,
      message: 'Invalid credentials!',
    });
  }

  const { accessToken, refreshToken } = issueTokens(user.id);

  setRefreshToken(event, refreshToken);
  setAccessToken(event, accessToken);

  const { password, ...data } = user;

  return data;
});
