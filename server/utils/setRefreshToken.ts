export function setRefreshToken(event: any, value: string) {
	const expires = new Date();
	expires.setDate(expires.getDate() + 30);

	setCookie(event.res, 'refreshToken', value, {
		httpOnly: true,
		sameSite: true,
		expires,
	});
}
