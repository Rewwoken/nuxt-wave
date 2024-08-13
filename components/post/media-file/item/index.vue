<script setup lang="ts">
	defineProps<{
		url: string;
		mimetype: string;
	}>();
</script>

<template>
	<PostMediaFileItemImage
		v-if="mimetype.startsWith('image')"
		:source="url"
	/>
	<PostMediaFileItemVideo
		v-else
		:source="url"
	/>
</template>
