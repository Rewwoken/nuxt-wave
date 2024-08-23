<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'onClose'): void;
	}>();

	const {
		hasErrors,
		handleSubmit,
		isSubmitting,
	} = useZodForm(registerSchema);

	const { submitRegister, serverError } = useRegisterRequest(() => {
		emit('onClose');
	});

	const onSubmit = handleSubmit(submitRegister);
</script>

<template>
	<form
		class="flex w-80 flex-col gap-y-2 py-0.5"
		@submit="onSubmit"
	>
		<AuthField
			name="email"
			icon="pi-envelope"
			type="text"
			placeholder="Email"
		/>
		<AuthField
			name="username"
			icon="pi-at"
			type="text"
			placeholder="Username"
		/>
		<AuthField
			name="password"
			icon="pi-lock"
			type="password"
			placeholder="Password"
		/>
		<!-- TODO: add password-confirm -->
		<AuthMessage :value="serverError" />
		<div class="flex items-end justify-between">
			<IconNuxt class="size-10" />
			<Button
				type="submit"
				label="Submit"
				size="small"
				pt:root:class="px-6"
				:loading="isSubmitting"
				:disabled="hasErrors"
				rounded
			/>
		</div>
	</form>
</template>
