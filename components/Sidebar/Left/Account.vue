<script setup lang="ts">
	const { data: user, status } = useFetch('/api/me', {
		method: 'GET',
		server: false,
	});

	const op = ref();

	function toggle(event: Event) {
		op.value.toggle(event);
	}

	async function logout() {
		await useFetch('/api/auth/logout', { method: 'POST' });

		navigateTo('/auth');
	}
</script>

<template>
	<div
		v-if="status === 'success' && user"
		class="flex items-center mt-8 rounded-full cursor-pointer xl:p-2 gap-x-2 xl:hover:bg-gray-500/10"
		@click="toggle"
	>
		<Avatar
			v-if="user.image"
			shape="circle"
			size="large"
			:image="user.image"
		/>
		<Avatar
			v-else
			shape="circle"
			size="large"
			icon="pi pi-user"
			class="dark:bg-dim dark:border"
		/>
		<div class="xl:flex flex-col gap-y-0.5 hidden">
			<span class="font-bold leading-4">{{ user.name }}</span>
			<span class="text-sm leading-4 text-neutral-500">{{ user.username }}</span>
		</div>
	</div>
	<p v-else>
		Loading...
	</p>
	<Popover ref="op">
		<Button
			label="Log out"
			size="small"
			severity="danger"
			icon="pi pi-sign-out"
			class="px-6"
			@click="logout"
		/>
	</Popover>
</template>
