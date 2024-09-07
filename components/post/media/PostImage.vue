<script setup lang="ts">
	defineProps<{
		source: string;
		width: number;
		height: number;
	}>();
</script>

<!-- TODO: Add GIF label -->
<template>
	<CldImage
		class="rounded-3xl border object-cover border-surface"
		alt="Post media file, image type"
		loading="lazy"
		gravity="center"
		crop="thumb"
		format="webp"
		:width="width"
		:height="height"
		:src="source"
	/>
</template>
