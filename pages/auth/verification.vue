<!-- ! `ssr: false` in nuxt.config.ts -->
<script setup lang="ts">
	const route = useRoute();

	const { verify } = useVerificationRequest();
	const id = route.query.id as string;
	const code = route.query.code as string;

	onMounted(() => {
		verify(id, code);
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
