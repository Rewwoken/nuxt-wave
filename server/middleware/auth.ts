import type { H3Event } from 'h3';

// ? Potential improvement: move middleware to onRequest in protected routes, rather than all
export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api')
    || event.path.startsWith('/api/auth')
    || event.path.startsWith('/api/send')
    || event.path === '/auth'
  ) {
    return void 0;
  }

  const authorizationHeader = getRequestHeader(event, 'authorization');
  const accessToken = authorizationHeader?.split(' ')[1];

  const isAccessValid = verifyToken(accessToken);
  if (isAccessValid) {
    return void handleVerifiedToken(event, accessToken!);
  }

  const cookies = parseCookies(event);
  const isRefreshValid = verifyToken(cookies.refreshToken);
  if (!isRefreshValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Invalid refresh token!',
    });
  }

  const { id } = decodeToken(cookies.refreshToken);
  const newAccessToken = issueAccessToken(id);

  setAccessToken(event, newAccessToken);
  handleVerifiedToken(event, newAccessToken);
});

function handleVerifiedToken(event: H3Event, value: string) {
  const { id } = decodeToken(value);
  event.context.userId = id;
}
