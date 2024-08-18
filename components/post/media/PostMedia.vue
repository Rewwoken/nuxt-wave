<script setup lang="ts">
	defineProps<{
		url: string;
		mimetype: string;
	}>();
</script>

<template>
	<PostImage
		v-if="mimetype.startsWith('image')"
		:source="url"
	/>
	<PostVideo
		v-else
		:source="url"
	/>
</template>
