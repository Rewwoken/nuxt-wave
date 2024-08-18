<script setup lang="ts">
	defineProps<{
		source: string;
	}>();
</script>

<template>
	<NewPostImage
		v-if="source.startsWith('data:image/')"
		:source="source"
	/>
	<NewPostVideo
		v-else-if="source.startsWith('data:video/')"
		:source="source"
	/>
</template>
