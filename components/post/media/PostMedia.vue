<script setup lang="ts">
	defineProps<{
		url: string;
		mimetype: string;
		size: number;
	}>();
</script>

<template>
	<PostImage
		v-if="mimetype.startsWith('image')"
		:source="url"
		:size="size"
	/>
	<PostVideo
		v-else
		:source="url"
		:size="size"
	/>
</template>
