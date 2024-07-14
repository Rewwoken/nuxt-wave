<script setup lang="ts">
	import { useForm } from 'vee-validate';
	import { toTypedSchema } from '@vee-validate/zod';
	import { registerSchema } from '~/schemas/register';

	const emit = defineEmits(['closeModal']);

	const { handleSubmit, errors, defineField } = useForm({
		validationSchema: toTypedSchema(registerSchema),
	});
	const [name] = defineField('name');
	const [username] = defineField('username');
	const [password] = defineField('password');

	const { register, isPending } = useAuth();

	const toast = useToast();
	const onSubmit = handleSubmit(async (values) => {
		await register(values);

		toast.add({
			severity: 'success',
			summary: 'Registration successful!',
			detail: 'Now you can log in.',
			life: 3000,
		});

		emit('closeModal');
	});
</script>

<template>
	<form
		autocomplete="off"
		class="flex flex-col gap-y-2"
		novalidate
		@submit="onSubmit"
	>
		<InputText
			v-model="name"
			type="text"
			autocomplete="new-password"
			placeholder="Name"
			aria-describedby="name-help"
			:invalid="errors.name"
		/>
		<small
			v-if="errors.name"
			id="name-help"
			class="ml-2 text-xs text-red-500"
		>
			{{ errors.name }}
		</small>
		<InputText
			v-model="username"
			type="text"
			autocomplete="new-password"
			placeholder="Username"
			aria-describedby="username-help"
			:invalid="errors.username"
		/>
		<small
			v-if="errors.username"
			id="username-help"
			class="ml-2 text-xs text-red-500"
		>
			{{ errors.username }}
		</small>
		<InputText
			v-model="password"
			type="password"
			autocomplete="new-password"
			placeholder="Password"
			toggle-mask
			aria-describedby="password-help"
			:invalid="errors.password"
		/>
		<small
			v-if="errors.password"
			id="password-help"
			class="ml-2 text-xs text-red-500"
		>
			{{ errors.password }}
		</small>
		<Button
			label="Submit"
			icon="pi pi-user"
			size="small"
			class="!text-white mt-1 self-end px-6"
			type="submit"
			:loading="isPending"
		/>
	</form>
</template>
