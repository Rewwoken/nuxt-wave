<!-- ! `ssr: false` in nuxt.config.ts -->
<script setup lang="ts">
	definePageMeta({
		layout: 'auth',
	});

	useSeoMeta({
		title: 'Email verification',
	});
</script>

<template>
	<AuthVerification />
</template>
