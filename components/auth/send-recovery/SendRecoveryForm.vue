<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'onSubmit'): void;
	}>();

	const {
		hasErrors,
		handleSubmit,
		isSubmitting,
	} = useZodForm(sendRecoverySchema);

	const { submitSendRecovery, serverError } = useSendRecoveryRequest();

	const onSubmit = handleSubmit(async (values) => {
		await submitSendRecovery(values, () => emit('onSubmit'));
	});
</script>

<template>
	<form
		class="flex flex-col gap-y-3"
		@submit="onSubmit"
	>
		<AuthField
			name="email"
			icon="pi-envelope"
			type="text"
			placeholder="Email"
		/>
		<AuthMessage :value="serverError" />
		<Button
			label="Send"
			icon="pi pi-send"
			type="submit"
			:loading="isSubmitting"
			:disabled="hasErrors"
			rounded
		/>
	</form>
</template>
