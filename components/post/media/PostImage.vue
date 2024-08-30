<script setup lang="ts">
	defineProps<{
		source: string;
		size: number;
	}>();
</script>

<!-- TODO: Add GIF label -->
<template>
	<CldImage
		class="aspect-square !max-h-full w-full !max-w-full rounded-3xl border object-cover border-surface"
		alt="Post media file, image type"
		loading="lazy"
		gravity="center"
		crop="thumb"
		format="webp"
		:width="size"
		:height="size"
		:src="source"
	/>
</template>
