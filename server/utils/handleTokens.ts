import type { H3Event } from 'h3';
import { prisma } from '~/server/database';

export async function handleInvalidAccessToken(
  event: H3Event,
  refreshToken: string,
) {
  const isRefreshValid = verifyToken(refreshToken);

  if (!isRefreshValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Invalid refresh token!',
    });
  }

  const { id } = decodeToken(refreshToken);
  await setTokensWithId(event, id);
}

export async function handleValidAccessToken(
  event: H3Event,
  accessToken: string,
) {
  const { id } = decodeToken(accessToken);
  await setTokensWithId(event, id);
}

async function setTokensWithId(event: H3Event, id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'User does not exist!',
    });
  }

  const { accessToken, refreshToken } = issueTokens(id);

  setAccessToken(event, accessToken);
  setRefreshToken(event, refreshToken);

  event.context.userId = id;
}
