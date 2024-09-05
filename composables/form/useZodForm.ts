import type { infer as ZodInfer, ZodSchema } from 'zod';

/**
 * Create a form using a Zod schema for validation.
 *
 * @param schema - The Zod schema to use for validation.
 */
export function useZodForm<T extends ZodSchema>(schema: T) {
	const { meta, handleSubmit, isSubmitting, resetForm, values } = useForm<ZodInfer<T>>({
		validateOnMount: false,
		validationSchema: toTypedSchema(schema),
	});

	/**
	 * A computed property that returns a boolean indicating if the form has errors.
	 * This property is only true if the form has been touched (i.e. the user has started typing) and the form is invalid.
	 */
	const hasErrors = computed(() => {
		return meta.value.touched && !meta.value.valid;
	});

	return {
		hasErrors,
		handleSubmit,
		isSubmitting,
		resetForm,
		values,
	};
}
