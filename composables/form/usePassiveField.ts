/**
 * Provides a way to use a form field with delayed validation.
 *
 * Creates a form field that doesn't trigger immediate re-validation.
 * Instead, it validates the field when the user interacts with it, such as on blur
 * or when submitting the form.
 *
 * @param name - The name of the form field.
 *
 * @returns An object containing the field's value, error message, and event listeners.
 */
export function usePassiveField(name: string) {
	const { value, handleChange, handleBlur, errorMessage, resetField } = useField<string>(
		() => name,
		undefined,
		{
			validateOnMount: false,
			validateOnValueUpdate: false,
		},
	);

	// https://vee-validate.logaretm.com/v4/guide/composition-api/custom-inputs#handling-events
	const listeners = {
		// When the user interacts with the form field, trigger a validation only if the field is not valid.
		input: (event: Event) => handleChange(event, !!errorMessage.value),
		// When the user blurs the field, trigger a validation.
		blur: (event: Event) => handleBlur(event, true),
		// When the user changes the value of the field, trigger a validation.
		change: handleChange,
	};

	return { value, listeners, errorMessage, resetField };
}
