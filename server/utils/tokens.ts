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
  await verifyDecodedId(id);

  tokens(event, id);
}

export async function handleValidAccessToken(
  event: H3Event,
  accessToken: string,
) {
  const { id } = decodeToken(accessToken);
  await verifyDecodedId(id);

  tokens(event, id);
}

async function verifyDecodedId(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'User does not exist!',
    });
  }
}

function tokens(event: H3Event, userId: string) {
  const { accessToken, refreshToken } = issueTokens(userId);

  setAccessToken(event, accessToken);
  setRefreshToken(event, refreshToken);

  event.context.userId = userId;
}
