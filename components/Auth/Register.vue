<script setup lang="ts">
	const emit = defineEmits(['closeModal']);

	const user = reactive({
		name: '',
		username: '',
		password: '',
	});

	const { register } = useAuth();

	async function onSubmit() {
		await register(user);

		emit('closeModal');
	}
</script>

<template>
	<form autocomplete="off" class="flex flex-col gap-y-2">
		<InputText
			v-model="user.name"
			type="text"
			autocomplete="new-password"
			placeholder="Name"
		/>
		<InputText
			v-model="user.username"
			type="text"
			autocomplete="new-password"
			placeholder="Username"
		/>
		<Password
			v-model="user.password"
			autocomplete="new-password"
			placeholder="Password"
			toggle-mask
		/>
		<Button
			label="Submit"
			icon="pi pi-user"
			size="small"
			class="!text-white mt-1 self-end px-6"
			@click.prevent="onSubmit"
		/>
	</form>
</template>
