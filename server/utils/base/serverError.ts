// Free to add other status codes as needed
const messsages = {
	400: 'Bad Request',
	401: 'Unauthorized',
	403: 'Forbidden',
	404: 'Not Found',
	500: 'Internal Server Error',
};
type Code = keyof typeof messsages;

/**
 * Throws a server error with a given status code, message, and data.
 * Automatically adds the `error/` prefix to the message, handles `statusMessage`.
 *
 * @param statusCode - The status code of the error. Defaults to `500`.
 * @param message - The message of the error. Defaults to `'unknown'`.
 * @param data - The data to be included in the error object. Defaults to `undefined`.
 * @throws A server error with the given status code, message, and data
 */
export function serverError(statusCode: Code = 500, message: string = 'unknown', data?: unknown) {
	throw createError({
		statusCode,
		statusMessage: messsages[statusCode],
		message: `error/${message}`,
		data,
	});
}
