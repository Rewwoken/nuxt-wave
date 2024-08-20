<script setup lang="ts">
	const route = useRoute();

	const {
		hasErrors,
		handleSubmit,
		isSubmitting,
	} = useAuthForm(recoverySchema);

	const { submitRecovery, serverError } = useRecoveryRequest(
		route.query.id,
		route.query.code,
	);

	const onSubmit = handleSubmit(submitRecovery);
</script>

<template>
	<VeeForm
		autocomplete="off"
		class="flex flex-col gap-y-2"
		novalidate
		@submit="onSubmit"
	>
		<AuthField
			name="password"
			icon="pi-lock"
			type="password"
			placeholder="Password"
		/>
		<AuthField
			name="confirmPassword"
			icon="pi-lock"
			type="password"
			placeholder="Confirm password"
		/>
		<AuthMessage :value="serverError" />
		<Button
			type="submit"
			label="Change password"
			pt:root:class="mt-2"
			:loading="isSubmitting"
			:disabled="hasErrors"
			fluid
			rounded
		/>
	</VeeForm>
</template>
