import {
  handleInvalidAccessToken,
  handleValidAccessToken,
} from '~/server/utils/handleTokens';
import { verifyToken } from '~/server/utils/jwt';

const publicRoutes = ['/api/auth/register', '/api/auth/login', '/api/auth/logout'];
export default defineEventHandler(async (event) => {
  // Should not be invoked on client or public routes
  if (!event.path.startsWith('/api') || publicRoutes.includes(event.path)) {
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
