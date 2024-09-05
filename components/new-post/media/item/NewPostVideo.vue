<script setup lang="ts">
	defineProps<{
		url: string;
	}>();
</script>

<template>
	<video
		class="aspect-[9/10] w-full object-cover "
		controls
		playsinline
		loop
	>
		<source :src="url">
	</video>
</template>
