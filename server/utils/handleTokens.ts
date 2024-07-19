import type { H3Event } from 'h3';
import logoutPost from '~/server/api/auth/logout.post';
import { prisma } from '~/server/database';

export async function handleInvalidAccessToken(
  event: H3Event,
  cookies: Record<string, string>,
) {
  const isRefreshValid = verifyToken(cookies.refreshToken);

  if (!isRefreshValid) {
    await logoutPost(event);

    return sendRedirect(event, '/auth');
  }

  const { id } = decodeToken(cookies.refreshToken);

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    await logoutPost(event);

    return sendRedirect(event, '/auth');
  }

  const { accessToken, refreshToken } = issueTokens(id);

  setAccessToken(event, accessToken);
  setRefreshToken(event, refreshToken);

  event.context.userId = id;
}

export async function handleValidAccessToken(
  event: H3Event,
  cookies: Record<string, string>,
) {
  const { id } = decodeToken(cookies.accessToken);

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    await logoutPost(event);

    return sendRedirect(event, '/auth');
  }

  const { accessToken, refreshToken } = issueTokens(id);

  setAccessToken(event, accessToken);
  setRefreshToken(event, refreshToken);

  event.context.userId = id;
}
