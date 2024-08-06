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
	<Auth />
</template>
