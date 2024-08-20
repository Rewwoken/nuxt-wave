export function useNewPostForm() {
	const { meta, handleSubmit, isSubmitting, resetForm } = useForm({
		validationSchema: toTypedSchema(createPostSchema),
		validateOnMount: false,
	});

	const hasErrors = computed(() => {
		return meta.value.touched && !meta.value.valid;
	});

	return {
		hasErrors,
		handleSubmit,
		isSubmitting,
		resetForm,
	};
}
