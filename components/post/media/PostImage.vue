<script setup lang="ts">
	defineProps<{
		source: string;
	}>();
</script>

<template>
	<CldImage
		width="500"
		height="500"
		class="aspect-square w-full rounded-3xl border object-cover border-surface"
		alt="Post media file, image type"
		:src="source"
	/>
</template>
