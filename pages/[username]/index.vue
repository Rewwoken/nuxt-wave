<script setup lang="ts">
	defineProps<{
		userId: string;
	}>();

	definePageMeta({
		layout: 'profile',
	});
</script>

<template>
	<ProfilePosts :user-id="userId" />
</template>
