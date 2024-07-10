<script setup lang="ts">
	const user = reactive({
		username: '',
		password: '',
	});

	const { login } = useAuth();

	async function onSubmit() {
		await login(user);
	}
</script>

<template>
	<form class="flex flex-col gap-y-2" @keydown.enter="onSubmit">
		<InputText
			v-model="user.username"
			type="text"
			size="small"
			autocomplete="username"
			placeholder="Username"
		/>
		<InputText
			v-model="user.password"
			type="password"
			size="small"
			autocomplete="current-password"
			placeholder="Password"
		/>
		<Button
			label="Submit"
			icon="pi pi-user"
			size="small"
			class="w-full !text-white !rounded-full mt-1"
			@click.prevent="onSubmit"
		/>
	</form>
</template>
