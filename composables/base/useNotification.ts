import type { ToastMessageOptions } from 'primevue/toast';

export function useNotification() {
	const toast = useToast();

	function showSuccess(message: string, options?: Partial<ToastMessageOptions>) {
		toast.add({
			severity: 'success',
			summary: 'Success',
			detail: message,
			life: 3000,
			...options,
		});
	}

	function showInfo(message: string, options?: Partial<ToastMessageOptions>) {
		toast.add({
			severity: 'info',
			summary: 'Info',
			detail: message,
			life: 3000,
			...options,
		});
	}

	function showError(message: string, options?: Partial<ToastMessageOptions>) {
		toast.add({
			severity: 'error',
			summary: 'Error',
			detail: message,
			life: 3000,
			...options,
		});
	}

	return {
		showInfo,
		showSuccess,
		showError,
	};
}
