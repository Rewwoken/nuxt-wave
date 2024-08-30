export function useSendRecoveryRequest() {
	const { $api } = useNuxtApp();

	const { handleRequest, serverError } = useHandleRequest();
	const { showInfo } = useNotification();

	const submitSendRecovery = async (values: SendRecoverySchema, onSuccess: () => void) => {
		await handleRequest({
			requestFunc: () => $api('/api/send/recovery', {
				method: 'POST',
				body: { email: values.email },
			}),
			onSuccess: () => {
				onSuccess();

				showInfo('Please, check your mailbox and follow the link in the message within 10 minutes before it expires.');
			},
			errors: {
				'error/invalid-body': 'Invalid data!',
				'error/unknown': 'Error sending email!',
			},
		});
	};

	return { submitSendRecovery, serverError };
}
