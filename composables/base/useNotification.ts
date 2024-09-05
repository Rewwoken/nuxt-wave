import type { ToastMessageOptions } from 'primevue/toast';

type ShowToast = (message: ToastMessageOptions['detail'], options?: Partial<ToastMessageOptions>) => void;
type CreateShowFunc = (severity: ToastMessageOptions['severity'], summary: ToastMessageOptions['summary']) => ShowToast;

/**
 * A hook that provides a notification system with customizable toast messages.
 *
 * @return An object containing three functions to display success, info, and error notifications.
 * @note Feel free to add more types of notifications.
 */
export function useNotification() {
	const toast = useToast();

	const createShowToastFunc: CreateShowFunc = (severity, summary) => {
		return function (message, options = {}) {
			toast.add({
				severity,
				summary,
				detail: message,
				life: 3000,
				...options,
			});
		};
	};

	return {
		showSuccess: createShowToastFunc('success', 'Success'),
		showInfo: createShowToastFunc('info', 'Info'),
		showError: createShowToastFunc('error', 'Error'),
	};
}
