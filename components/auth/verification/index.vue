<script setup lang="ts">
	import { FetchError } from 'ofetch';

	const route = useRoute();
	const toast = useToast();

	onMounted(async () => {
		try {
			await $fetch('/api/auth/verification', {
				method: 'GET',
				query: {
					id: route.query.id,
					code: route.query.code,
				},
			});

			toast.add({
				severity: 'success',
				summary: 'Email verified successfully!',
				detail: 'You can log in now.',
				life: 7000,
			});
		}
		catch (err) {
			if (err instanceof FetchError) {
				if (err.data.message === 'error/expired') {
					toast.add({
						severity: 'error',
						summary: 'Error verifying email!',
						detail: 'Verification link expired. Please, try again later.',
					});
				}
				else if (err.data.message === 'error/not-found') {
					toast.add({
						severity: 'error',
						summary: 'Error verifying email!',
						detail: 'User not found. Please, try again later.',
						life: 7000,
					});
				}
				else {
					toast.add({
						severity: 'error',
						summary: 'Error verifying email!',
						detail: 'Unexpected error. Please, try again later.',
						life: 7000,
					});
				}
			}
			else {
				toast.add({
					severity: 'error',
					summary: 'Error verifying email!',
					detail: 'Unexpected error. Please, try again later.',
					life: 7000,
				});
			}
		}
		finally {
			await navigateTo('/auth');
		}
	});
</script>

<template>
	<div class="pointer-events-none select-none">
		<Auth />
	</div>
</template>
