<script setup lang="ts">
	defineProps<{
		url: string;
		mimetype: string;
		width: number;
		height: number;
	}>();
</script>

<template>
	<PostImage
		v-if="mimetype.startsWith('image')"
		:source="url"
		:width="width"
		:height="height"
	/>
	<PostVideo
		v-else
		:source="url"
		:width="width"
		:height="height"
	/>
</template>
