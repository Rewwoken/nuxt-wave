<!-- ! `ssr: false` in nuxt.config.ts -->
<script setup lang="ts">
	definePageMeta({
		layout: 'auth',
	});

	useSeoMeta({
		title: 'Login',
	});
</script>

<template>
	<div class="mb-1 flex flex-col gap-y-4">
		<AuthLoginForm />
		<AuthRecoveryRequestModal />
	</div>
	<AuthRegisterModal />
</template>
