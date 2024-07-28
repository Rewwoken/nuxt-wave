import type { H3Event } from 'h3';

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api')
    || event.path.startsWith('/api/auth')
    || event.path.startsWith('/api/send')
    || event.path === '/auth'
  ) {
    return void 0;
  }
  const cookies = parseCookies(event);

  const isAccessValid = verifyToken(cookies.accessToken);
  if (isAccessValid) {
    return void handleVerifiedToken(event, cookies.accessToken);
  }

  const isRefreshValid = verifyToken(cookies.refreshToken);
  if (!isRefreshValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Invalid refresh token!',
    });
  }

  const { id } = decodeToken(cookies.refreshToken);
  const { accessToken, refreshToken } = issueTokens(id);

  setAccessToken(event, accessToken);
  setRefreshToken(event, refreshToken);

  handleVerifiedToken(event, accessToken);
});

function handleVerifiedToken(event: H3Event, value: string) {
  const { id } = decodeToken(value);
  event.context.userId = id;
}
