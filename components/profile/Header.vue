<script setup lang="ts">
	import type { User } from '~/types/api.types';

	const router = useRouter();

	const user = inject('user') as User;
	const { data: count } = useAPI('/api/post/count', {
		method: 'GET',
		query: {
			userId: user.id,
		},
	});

	const { logout } = useCurrentUser();
</script>

<template>
	<div class="flex items-center p-1 gap-x-6">
		<Button
			icon="pi pi-arrow-left"
			aria-label="Back"
			severity="contrast"
			pt:root:class="!border-0"
			outlined
			rounded
			@click="router.back"
		/>
		<div class="flex flex-col leading-4">
			<span class="text-xl font-bold">{{ user.profile.name }}</span>
			<span class="text-xs text-gray-500">{{ count }} posts</span>
		</div>
		<Button
			icon="pi pi-sign-out"
			aria-label="Back"
			severity="contrast"
			pt:root:class="!border-0 md:!hidden !ml-auto"
			pt:icon:class="!text-xl"
			outlined
			rounded
			@click="logout"
		/>
	</div>
</template>
