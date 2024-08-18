<!-- ! `ssr: false` in nuxt.config.ts -->
<script setup lang="ts">
	const { handleRequest } = useHandleRequest();
	const route = useRoute();
	const toast = useToast();

	onMounted(async () => {
		await handleRequest({
			requestFunc: () => $fetch('/api/auth/verification', {
				method: 'GET',
				query: {
					id: route.query.id,
					code: route.query.code,
				},
			}),
			onSuccess: () => {
				toast.add({
					severity: 'success',
					summary: 'Email verified successfully!',
					detail: 'You can log in now.',
					life: 7000,
				});
			},
			errors: {
				'error/expired': 'Verification link expired. Please, try again later.',
				'error/not-found': 'User not found.',
				'error/unknown': 'Unexpected error. Please, try again later.',
			},
			onError: (message) => {
				toast.add({
					severity: 'error',
					summary: 'Error verifying email!',
					detail: message,
					life: 7000,
				});
			},
			finallyFunc: async () => {
				await navigateTo('/auth');
			},
		});
	});

	definePageMeta({
		layout: 'auth',
	});

	useSeoMeta({
		title: 'Email verification',
	});
</script>

<template>
	<div class="pointer-events-none select-none">
		<div class="mb-1 flex flex-col gap-y-4">
			<LoginForm />
			<RequestRecoveryModal />
		</div>
		<RegisterModal />
	</div>
</template>
