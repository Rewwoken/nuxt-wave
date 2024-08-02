import { FetchError } from 'ofetch';

interface ErrorMessages {
	[key: string]: string;
	'error/unknown': string;
}

/**
 * Custom composable for handling form requests.
 *
 * @returns - An object containing the `handleFormRequest` function and `serverError` ref.
 */
export default () => {
	const serverError = ref<string | null>(null);

	/**
	 * Handles form requests with success and error handling.
	 *
	 * @param requestFunc - The request function that returns a promise; should be like `() => $api(...)`.
	 * @param onSuccess - The success handler function that is called with the response data.
	 * @param errorMessages - An object containing error messages in `{ 'error/code': 'message' }` format.
	 * @param errorFunc - An optional error handler function that is called with the error message.
	 */
	const handleFormRequest = async <T>(
		requestFunc: () => Promise<T>,
		onSuccess: (data: T) => (Promise<void> | void),
		errorMessages: ErrorMessages,
		errorFunc?: (message: string) => void,
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
				errorFunc(serverError.value);
			}
		}
	};

	return { handleFormRequest, serverError };
};
