<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'onSubmit'): void;
	}>();

	const { handleSubmit, errors, defineField, isSubmitting } = useForm({
		validationSchema: toTypedSchema(
			requestRecoverySchema,
		),
	});
	const [email] = defineField('email');
	const hasErrors = computed(() => !!Object.keys(errors.value).length);

	const { handleRequest, serverError } = useHandleRequest();

	const { $api } = useNuxtApp();
	const toast = useToast();

	const onSubmit = handleSubmit(async (values) => {
		await handleRequest({
			requestFunc: () => $api('/api/send/recovery', {
				method: 'POST',
				body: { email: values.email },
			}),
			onSuccess: () => {
				toast.add({
					severity: 'info',
					summary: 'A password recovery email has been sent to your email.',
					detail: 'If the user exists, you will receive an email. Please, check your mailbox and follow the link in the message within 10 minutes before it expires.',
				});

				emit('onSubmit');
			},
			errors: {
				'error/not-expired': 'Previous code has not expired!',
				'error/unknown': 'Error sending email!',
			},
		});
	});
</script>

<template>
	<form
		autocomplete="off"
		class="flex flex-col gap-y-3"
		novalidate
		@submit="onSubmit"
	>
		<IconField>
			<InputIcon class="pi pi-envelope" />
			<InputText
				v-model="email"
				type="text"
				name="email"
				autocomplete="new-password"
				placeholder="Email"
				aria-describedby="email-help"
				:invalid="!!errors.email"
				autofocus
				fluid
			/>
		</IconField>
		<small
			v-if="errors.email"
			id="email-help"
			class="ml-2 text-xs text-red-500"
		>
			{{ errors.email }}
		</small>
		<Message
			v-if="serverError"
			severity="error"
			closable
		>
			{{ serverError }}
		</Message>
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
