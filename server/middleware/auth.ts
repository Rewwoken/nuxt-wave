import logoutPost from '~/server/api/auth/logout.post';
import { handleInvalidAccessToken, handleValidAccessToken } from '~/server/utils/handleTokens';
import { verifyToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  try {
    // This middleware should not handle auth routes (both api and pages)
    if (event.path.includes('/auth')) {
      return;
    }

    const cookies = parseCookies(event);
    const isAccessValid = verifyToken(cookies.accessToken);

    if (!isAccessValid) {
      await handleInvalidAccessToken(event, cookies);
    }
    else {
      await handleValidAccessToken(event, cookies);
    }
  }
  catch (error) {
    await logoutPost(event);

    return sendRedirect(event, '/auth');
  }
});
