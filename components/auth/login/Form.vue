<script setup lang="ts">
	import { loginSchema } from '~/schemas/auth/login';

	const { handleSubmit, errors, defineField, isSubmitting } = useForm({
		validationSchema: toTypedSchema(loginSchema),
		validateOnMount: false,
	});

	const [username, usernameAttrs] = defineField('username', state => ({
		validateOnModelUpdate: state.errors.length > 0,
		validateOnBlur: false,
	}));
	const [password, passwordAttrs] = defineField('password', state => ({
		validateOnModelUpdate: state.errors.length > 0,
		validateOnBlur: false,
	}));

	const hasErrors = computed(() => !!Object.keys(errors.value).length);

	const { handleRequest, serverError } = useHandleRequest();
	const { $api } = useNuxtApp();
	const toast = useToast();

	const onSubmit = handleSubmit(async (values) => {
		await handleRequest({
			requestFunc: () => $api('/api/auth/login', {
				method: 'POST',
				body: values,
			}),
			onSuccess: async () => {
				await navigateTo('/home', { replace: true });
				toast.add({
					severity: 'info',
					summary: 'Successfully logged in!',
					detail: `You logged in as @${values.username}.`,
					life: 3000,
				});
			},
			errors: {
				'error/credentials': 'Invalid credentials!',
				'error/not-verified': 'Email is not verified!',
				'error/body': 'Invalid data!',
				'error/unknown': 'Unexpected error!',
			},
		});
	});
</script>

<template>
	<form
		class="flex flex-col gap-y-2"
		novalidate
		@submit="onSubmit"
	>
		<IconField>
			<InputIcon class="pi pi-at" />
			<InputText
				v-model="username"
				v-bind="usernameAttrs"
				type="text"
				name="username"
				autocomplete="off"
				placeholder="Username"
				aria-describedby="username-help"
				:invalid="!!errors.username"
				fluid
			/>
		</IconField>
		<ErrorMessage
			id="username-help"
			name="username"
			class="ml-2 text-xs text-red-500"
		/>
		<IconField>
			<InputIcon class="pi pi-lock" />
			<InputText
				v-model="password"
				v-bind="passwordAttrs"
				type="password"
				name="password"
				autocomplete="off"
				placeholder="Password"
				aria-describedby="password-help"
				:invalid="!!errors.password"
				fluid
			/>
		</IconField>
		<ErrorMessage
			id="password-help"
			name="password"
			class="ml-2 text-xs text-red-500"
		/>
		<Message
			v-if="serverError"
			severity="error"
			closable
		>
			{{ serverError }}
		</Message>
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
