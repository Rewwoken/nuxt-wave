<script setup lang="ts">
	const {
		hasErrors,
		handleSubmit,
		isSubmitting,
	} = useZodForm(loginSchema);

	const { submitLogin, serverError } = useLoginRequest();

	const onSubmit = handleSubmit(submitLogin);
</script>

<template>
	<form
		class="flex flex-col gap-y-2"
		@submit="onSubmit"
	>
		<AuthField
			name="username"
			icon="pi-at"
			type="text"
			placeholder="Username"
		/>
		<AuthField
			icon="pi-lock"
			name="password"
			type="password"
			placeholder="Password"
		/>
		<AuthMessage :value="serverError" />
		<Button
			type="submit"
			label="Submit"
			icon="pi pi-user"
			:loading="isSubmitting"
			:disabled="hasErrors"
			rounded
		/>
	</form>
</template>
