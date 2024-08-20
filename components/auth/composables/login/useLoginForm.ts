export function useLoginForm() {
	const { meta, handleSubmit, isSubmitting } = useForm({
		validationSchema: toTypedSchema(loginSchema),
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
