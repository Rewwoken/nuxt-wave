<script setup lang="ts">
	import type { User } from '~/types/api.types';

	const props = defineProps<{
		user: User;
	}>();

	const { data: count } = await useAPI('/api/post/count', {
		method: 'GET',
		query: {
			userId: props.user.id,
		},
	});

	const router = useRouter();

	async function onLogout() {
		await logout();
	}
</script>

<template>
	<div class="flex items-center p-1 gap-x-6">
		<Button
			icon="pi pi-arrow-left"
			aria-label="Back"
			severity="contrast"
			pt:root:class="!border-none"
			outlined
			rounded
			@click="router.back"
		/>
		<div class="flex flex-col leading-4 overflow-hidden">
			<span class="text-xl font-bold">{{ user.profile!.name }}</span>
			<span class="text-xs text-gray-500">{{ count }} posts</span>
		</div>
		<Button
			icon="pi pi-sign-out"
			aria-label="Back"
			severity="contrast"
			pt:root:class="ml-auto border-none md:hidden"
			pt:icon:class="text-xl"
			outlined
			rounded
			@click="onLogout"
		/>
	</div>
</template>
