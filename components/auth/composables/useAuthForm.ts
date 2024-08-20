// * Consider reading https://vee-validate.logaretm.com/v4/guide/best-practices#displaying-errors to better understand the code
import type { ZodSchema } from 'zod';

export function useAuthForm(schema: ZodSchema) {
	const { meta, handleSubmit, isSubmitting } = useForm({
		validationSchema: toTypedSchema(schema),
		validateOnMount: false,
	});

	const hasErrors = computed(() => {
		return meta.value.touched && !meta.value.valid;
	});

	return {
		hasErrors,
		handleSubmit,
		isSubmitting,
	};
}
