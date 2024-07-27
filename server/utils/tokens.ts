import type { H3Event } from 'h3';
import { addDays, addMinutes } from 'date-fns';
import { prisma } from '~/server/database';

export function setRefreshToken(event: H3Event, value: string) {
  const expires = addDays(new Date(), 30);

  setCookie(event, 'refreshToken', value, {
    httpOnly: true,
    sameSite: 'strict',
    expires,
  });
}

export function setAccessToken(event: H3Event, value: string) {
  const expires = addMinutes(new Date(), 10);

  setCookie(event, 'accessToken', value, {
    httpOnly: true,
    sameSite: 'strict',
    expires,
  });
}

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

  handleTokens(event, id);
}

export async function handleValidAccessToken(
  event: H3Event,
  accessToken: string,
) {
  const { id } = decodeToken(accessToken);
  await verifyDecodedId(id);

  handleTokens(event, id);
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

function handleTokens(event: H3Event, userId: string) {
  const { accessToken, refreshToken } = issueTokens(userId);

  setAccessToken(event, accessToken);
  setRefreshToken(event, refreshToken);

  event.context.userId = userId;
}
