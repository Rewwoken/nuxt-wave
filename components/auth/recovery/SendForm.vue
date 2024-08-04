<script setup lang="ts">
	import { sendRecoverySchema } from '~/schemas/sendRecovery';

	const emit = defineEmits<{
		(e: 'onSubmit'): void;
	}>();

	const { handleSubmit, errors, defineField, isSubmitting } = useForm({
		validationSchema: toTypedSchema(
			sendRecoverySchema,
		),
	});
	const [email] = defineField('email');
	const hasErrors = computed(() => !!Object.keys(errors.value).length);

	const { handleFormRequest, serverError } = useHandleForm();

	const { $api } = useNuxtApp();
	const toast = useToast();

	const onSubmit = handleSubmit(async (values) => {
		await handleFormRequest(
			() => $api('/api/send/recovery', {
				method: 'POST',
				body: { email: values.email },
			}),
			() => {
				toast.add({
					severity: 'info',
					summary: 'A password recovery email has been sent to your email.',
					detail: 'If the user exists, you will receive an email. Please, check your mailbox and follow the link in the message within 10 minutes before it expires.',
				});

				emit('onSubmit');
			},
			{
				'error/not-expired': 'Previous code has not expired!',
				'error/unknown': 'Error sending email!',
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
		<IconField class="w-full">
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
		<small v-if="errors.email" id="email-help" class="ml-2 text-xs text-red-500">
			{{ errors.email }}
		</small>
		<Message v-if="serverError" severity="error" closable>
			{{ serverError }}
		</Message>
		<Button
			label="Send"
			icon="pi pi-send"
			pt:root:class="!mt-4 !text-white"
			:loading="isSubmitting"
			:disabled="hasErrors"
			type="submit"
			fluid
			rounded
		/>
	</form>
</template>
