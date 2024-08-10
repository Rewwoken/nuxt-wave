import { FetchError } from 'ofetch';

interface HandleRequestErrors {
	[key: string]: string;
	'error/unknown': string;
}

interface HandleRequestParams<T> {
	requestFunc: () => Promise<T>;
	onSuccess: (data: T) => Promise<void> | void;
	errors: HandleRequestErrors;
	onError?: (message: string) => Promise<void> | void;
	finallyFunc?: () => Promise<void> | void;
}

/**
 * Creates a hook for handling API requests.
 *
 * @returns An object containing the `handleRequest` function and a reactive `serverError` ref.
 */
export default () => {
	const serverError = ref<string | null>(null);

	/**
	 * Handles requests with success and error processing.
	 *
	 * @param params The handling params
	 * @param params.requestFunc The request function that returns a promise.
	 * @param params.onSuccess The success handler function that is called with the response data.
	 * @param params.errors An object containing error messages in the format `{ 'error/code': 'message' }`.
	 * @param params.onError An optional error handler function that is called with the error message.
	 * @param params.finallyFunc An optional function that is always called after the request and success/error handling.
	 */
	const handleRequest = async <T>({
		requestFunc,
		onSuccess,
		errors,
		onError,
		finallyFunc,
	}: HandleRequestParams<T>) => {
		try {
			serverError.value = null;
			const response: T = await requestFunc();

			await onSuccess(response);
		}
		catch (err) {
			if (err instanceof FetchError) {
				const code = err.data.message;
				serverError.value = errors[code] || errors['error/unknown'];
			}
			else {
				serverError.value = errors['error/unknown'];
			}

			if (onError) {
				await onError(serverError.value);
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
