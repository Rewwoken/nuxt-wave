<script setup lang="ts">
	import { recoverySchema } from '~/schemas/recovery';

	const route = useRoute();
	if (!route.query.id || route.query.code?.length !== 36) {
		await navigateTo('/auth');
	}

	const { handleSubmit, errors, defineField, isSubmitting } = useForm({
		validationSchema: toTypedSchema(recoverySchema),
	});
	const [password] = defineField('password');
	const [confirmPassword] = defineField('confirmPassword');
	const hasErrors = computed(() => !!Object.keys(errors.value).length);

	const { handleRequest, serverError } = useHandleRequest();

	const { $api } = useNuxtApp();
	const toast = useToast();

	const onSubmit = handleSubmit(async (values) => {
		await handleRequest(
			() => $api('/api/auth/recovery', {
				method: 'POST',
				query: {
					id: route.query.id,
					code: route.query.code,
				},
				body: values,
			}),
			async () => {
				toast.add({
					severity: 'success',
					summary: 'Password has been successfully changed.',
					detail: 'You can now log in with a new password.',
					life: 5000,
				});

				await navigateTo('/auth');
			},
			{
				'error/expried': 'Recovery code expired!',
				'error/unknown': 'Error recovering the password!',
			},
		);
	});
</script>

<template>
	<form
		autocomplete="off"
		class="flex flex-col gap-y-2"
		novalidate
		@submit="onSubmit"
	>
		<IconField>
			<InputIcon class="pi pi-lock" />
			<InputText
				v-model="password"
				type="password"
				name="password"
				autocomplete="new-password"
				placeholder="New pasword"
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
		<IconField>
			<InputIcon class="pi pi-unlock" />
			<InputText
				v-model="confirmPassword"
				type="password"
				name="confirmPassword"
				autocomplete="new-password"
				placeholder="Confirm new password"
				aria-describedby="confirm-password-help"
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
		<Message
			v-if="serverError"
			severity="error"
			closable
		>
			{{ serverError }}
		</Message>
		<Button
			type="submit"
			label="Change password"
			pt:root:class="mt-2"
			:loading="isSubmitting"
			:disabled="hasErrors"
			fluid
			rounded
		/>
	</form>
</template>
