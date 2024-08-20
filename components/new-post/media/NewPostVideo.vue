<script setup lang="ts">
	defineProps<{
		url: string;
	}>();
</script>

<template>
	<video
		class="aspect-square w-full rounded-2xl object-cover"
		controls
		playsinline
		loop
	>
		<source :src="url">
	</video>
</template>
