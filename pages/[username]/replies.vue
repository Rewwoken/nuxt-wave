<script setup lang="ts">
	defineProps<{
		userId: string;
	}>();

	definePageMeta({
		layout: 'profile',
	});
</script>

<template>
	<ProfileThreads :user-id="userId" />
</template>
