import type { ToastMessageOptions } from 'primevue/toast';

type ShowToast = (message: string, options?: Partial<ToastMessageOptions>) => void;
type CreateToast = (severity: ToastMessageOptions['severity'], summary: string) => ShowToast;

/**
 * A hook that provides a notification system with customizable toast messages.
 *
 * @return An object containing three functions to display success, info, and error notifications.
 */
export function useNotification() {
	const toast = useToast();

	const createToast: CreateToast = (severity, summary) =>
		(message, options = {}) => {
			toast.add({
				severity,
				summary,
				detail: message,
				life: 3000,
				...options,
			});
		};

	return {
		showSuccess: createToast('success', 'Success'),
		showInfo: createToast('info', 'Info'),
		showError: createToast('error', 'Error'),
	};
}
