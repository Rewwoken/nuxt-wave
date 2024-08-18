<script setup lang="ts">
	defineProps<{
		source: string;
	}>();
</script>

<template>
	<video
		class="aspect-square w-full rounded-2xl object-cover"
		controls
		playsinline
		loop
	>
		<source :src="source">
	</video>
</template>
