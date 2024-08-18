<script setup lang="ts">
	import { registerSchema } from '~/schemas/auth/register';

	const emit = defineEmits<{
		(e: 'onSubmit'): void;
	}>();

	const { handleSubmit, errors, defineField, isSubmitting } = useForm({
		validationSchema: toTypedSchema(registerSchema),
		validateOnMount: false,
	});

	const [email, emailAttrs] = defineField('email', state => ({
		validateOnModelUpdate: state.errors.length > 0,
		validateOnBlur: false,
	}));
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
			requestFunc: () => $api('/api/auth/register', {
				method: 'POST',
				body: values,
			}),
			onSuccess: async () => {
				emit('onSubmit');

				toast.add({
					severity: 'info',
					summary: 'An email has been sent to verify your email address.',
					detail: 'Please, check your mailbox and follow the link in the message within 15 minutes before it expires.',
				});
			},
			errors: {
				'error/user-exists': 'User already exists!',
				'error/not-expired': 'Previous code has not expired!',
				'error/body': 'Invalid data!',
				'error/unknown': 'Unexpected error!',
			},
		});
	});
</script>

<template>
	<form
		class="flex w-80 flex-col gap-y-2 py-0.5"
		@submit="onSubmit"
	>
		<IconField>
			<InputIcon class="pi pi-envelope" />
			<InputText
				v-model="email"
				v-bind="emailAttrs"
				type="text"
				name="email"
				autocomplete="email"
				placeholder="Email"
				aria-describedby="email-help"
				:invalid="!!errors.email"
				autofocus
				fluid
			/>
		</IconField>
		<ErrorMessage
			id="email-help"
			name="email"
			class="ml-2 text-xs text-red-500"
		/>
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
		<!-- TODO: add password-confirm -->
		<Message
			v-if="serverError"
			severity="error"
			closable
		>
			{{ serverError }}
		</Message>
		<div class="flex items-end justify-between">
			<IconNuxt class="size-10" />
			<Button
				type="submit"
				label="Submit"
				size="small"
				:loading="isSubmitting"
				:disabled="hasErrors"
			/>
		</div>
	</form>
</template>
