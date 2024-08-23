/**
 * Provides a way to use a form field without immediately triggering a re-validation.
 *
 * @remarks
 * This function is a helper to use a form field without immediately triggering a re-validation.
 * It's useful when you want a form field to be validated only when the user interacts with it (e.g. when the user
 * blurs the field, or when the user clicks on the submit button).
 *
 * @param name - The name of the form field.
 *
 * @returns An object containing the value of the form field,
 * and an object with event listeners that should be attached to the form field.
 */
export function usePassiveField(name: string) {
	const { value, handleChange, handleBlur, errorMessage } = useField<string>(
		// Props are not reactive, so we get reactive-like behavior with function approach
		// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats#function-field-names-with-usefield
		() => name,
		// Skip the rules param, leave it to useForm
		undefined,
		// Disable immediate validation on update.
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

	return { value, listeners, errorMessage };
}
