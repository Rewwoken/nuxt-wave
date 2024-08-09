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
	<div class="sticky top-0 z-10 flex items-center gap-x-6 bg-bg-color p-1">
		<Button
			icon="pi pi-arrow-left"
			aria-label="Back"
			severity="contrast"
			pt:root:class="!border-none"
			outlined
			rounded
			@click="router.back"
		/>
		<div class="flex flex-col overflow-hidden leading-4">
			<span class="text-xl font-bold">{{ user.profile!.name }}</span>
			<span class="text-xs text-muted-color">{{ count }} posts</span>
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
