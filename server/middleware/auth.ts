import logoutPost from '~/server/api/auth/logout.post';
import { handleInvalidAccess, handleValidAccess } from '~/server/utils/handleTokens';
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
			await handleInvalidAccess(event, cookies);
		}
		else {
			await handleValidAccess(event, cookies);
		}
	}
	catch (error) {
		await logoutPost(event);

		return sendRedirect(event, '/auth');
	}
});
