<script setup lang="ts">
	const route = useRoute();

	const {
		hasErrors,
		handleSubmit,
		isSubmitting,
	} = useZodForm(recoverySchema);

	const { submitRecovery, serverError } = useRecoveryRequest();

	const onSubmit = handleSubmit(async (values) => {
		await submitRecovery(values, route.query.id, route.query.code);
	});
</script>

<template>
	<form
		autocomplete="off"
		class="flex flex-col gap-y-2"
		@submit="onSubmit"
	>
		<AuthField
			name="password"
			icon="pi-lock"
			type="password"
			placeholder="New password"
		/>
		<AuthField
			name="confirmPassword"
			icon="pi-lock"
			type="password"
			placeholder="Confirm new password"
		/>
		<AuthMessage :value="serverError" />
		<Button
			type="submit"
			label="Change password"
			class="mt-2"
			:loading="isSubmitting"
			:disabled="hasErrors"
			fluid
			rounded
		/>
	</form>
</template>
