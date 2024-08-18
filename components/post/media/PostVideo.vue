<script setup lang="ts">
	defineProps<{
		source: string;
	}>();

	const colors = {
		accent: 'var(--p-primary-color)',
	};
</script>

<template>
	<CldVideoPlayer
		width="300"
		height="300"
		font-face="Inter"
		class-name="rounded-3xl border border-surface"
		:logo="{ imageUrl: '/favicon.svg', onClickUrl: 'https://github.com/Rewwoken/wave' }"
		:src="source"
		:colors="colors"
		:loop="true"
	/>
</template>
