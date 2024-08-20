<script setup lang="ts">
	defineProps<{
		mimetype: string;
		url: string;
	}>();
</script>

<template>
	<NewPostImage
		v-if="mimetype.startsWith('image/')"
		class="border border-surface"
		:url="url"
	/>
	<NewPostVideo
		v-else-if="mimetype.startsWith('video/')"
		class="border border-surface"
		:url="url"
	/>
</template>
