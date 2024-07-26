export default defineEventHandler(async (event) => {
  const shouldNotBeInvoked = notInvoke(event.path, {
    paths: ['/api/send/recovery'],
    func: () => !event.path.startsWith('/api') || event.path.startsWith('/api/auth'),
  });
  if (shouldNotBeInvoked) {
    return;
  }

  const cookies = parseCookies(event);
  if (!cookies.refreshToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'No refresh token!',
    });
  }

  const isAccessValid = verifyToken(cookies.accessToken);
  if (!isAccessValid) {
    await handleInvalidAccessToken(event, cookies.refreshToken);
  }
  else {
    await handleValidAccessToken(event, cookies.accessToken);
  }
});
