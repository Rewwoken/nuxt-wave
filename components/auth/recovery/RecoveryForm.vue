<script setup lang="ts">
	import { recoverySchema } from '~/schemas/recovery';

	const { handleSubmit, errors, defineField, isSubmitting } = useForm({
		validationSchema: toTypedSchema(recoverySchema),
	});
	const [password] = defineField('password');
	const [confirmPassword] = defineField('confirmPassword');
	const hasErrors = computed(() => !!Object.keys(errors.value).length);

	const serverError = ref<string | null>(null);

	const route = useRoute();
	if (!route.query.id || !route.query.code) {
		await navigateTo('/auth');
	}

	const toast = useToast();
	const onSubmit = handleSubmit(async (values) => {
		serverError.value = null;
		const { error } = await useFetch('/api/auth/recovery', {
			method: 'POST',
			query: {
				id: route.query.id,
				code: route.query.code,
			},
			body: { password: values.password },
		});

		if (error.value) {
			serverError.value = 'Error changing the password!';

			return null;
		}

		toast.add({
			severity: 'success',
			summary: 'Password has been successfully changed.',
			detail: 'You can now log in with a new password.',
			life: 5000,
		});

		await navigateTo('/auth');
	});
</script>

<template>
	<form
		autocomplete="off"
		novalidate
		class="flex flex-col gap-y-2"
		@submit="onSubmit"
	>
		<IconField class="w-full">
			<InputIcon class="pi pi-lock" />
			<InputText
				v-model="password"
				type="password"
				autocomplete="new-password"
				placeholder="Pasword"
				aria-describedby="password-help"
				:invalid="!!errors.password"
				autofocus
				fluid
			/>
		</IconField>
		<small
			v-if="errors.password"
			id="password-help"
			class="ml-2 text-xs text-red-500"
		>
			{{ errors.password }}
		</small>
		<IconField class="w-full">
			<InputIcon class="pi pi-unlock" />
			<InputText
				v-model="confirmPassword"
				type="password"
				autocomplete="new-password"
				placeholder="Confirm pasword"
				aria-describedby="password-help"
				:invalid="!!errors.confirmPassword"
				autofocus
				fluid
			/>
		</IconField>
		<small
			v-if="errors.confirmPassword"
			id="confirm-password-help"
			class="ml-2 text-xs text-red-500"
		>
			{{ errors.confirmPassword }}
		</small>
		<Message v-if="serverError" severity="error" closable>
			{{ serverError }}
		</Message>
		<Button
			label="Change password"
			pt:root:class="!mt-2 !text-white"
			:loading="isSubmitting"
			:disabled="hasErrors"
			type="submit"
			fluid
			rounded
		/>
	</form>
</template>
