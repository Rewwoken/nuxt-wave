<!-- ! `ssr: false` in nuxt.config.ts -->
<script setup lang="ts">
	definePageMeta({
		layout: 'auth',
	});

	useSeoMeta({
		title: 'Password recovery',
	});
</script>

<template>
	<AuthRecoveryForm />
</template>
