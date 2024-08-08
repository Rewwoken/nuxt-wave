import { FetchError } from 'ofetch';

interface ErrorMessages {
	[key: string]: string;
	'error/unknown': string;
}

/**
 * Custom composable for handling API requests.
 *
 * @returns - An object containing the `handleRequest` function and `serverError` ref.
 */
export default () => {
	const serverError = ref<string | null>(null);

	/**
	 * Handles form requests with success and error handling.
	 *
	 * @param requestFunc - The request function that returns a promise. TS may sometimes display "Excessive stack depth comparing types" error.
	 * @param onSuccess - The success handler function that is called with the response data.
	 * @param errorMessages - An object containing error messages in `{ 'error/code': 'message' }` format.
	 * @param errorFunc - An optional error handler function that is called with the error message.
	 * @param finallyFunc - An optional function that is always called after the request and success/error func.
	 */
	const handleRequest = async <T>(
		requestFunc: () => Promise<T>,
		onSuccess: (data: T) => Promise<void> | void,
		errorMessages: ErrorMessages,
		errorFunc?: (message: string) => Promise<void> | void,
		finallyFunc?: () => Promise<void> | void,
	) => {
		try {
			serverError.value = null;
			const response: T = await requestFunc();

			await onSuccess(response);
		}
		catch (err) {
			if (err instanceof FetchError) {
				const code = err.data.message;
				serverError.value = errorMessages[code] || errorMessages['error/unknown'];
			}
			else {
				serverError.value = errorMessages['error/unknown'];
			}

			if (errorFunc) {
				await errorFunc(serverError.value);
			}
		}
		finally {
			if (finallyFunc) {
				await finallyFunc();
			}
		}
	};

	return { handleRequest, serverError };
};
