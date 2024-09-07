<script setup lang="ts">
	defineProps<{
		source: string;
		width: number;
		height: number;
	}>();

	const colors = {
		accent: 'var(--p-primary-color)',
	};
</script>

<template>
	<CldVideoPlayer
		font-face="Inter"
		class-name="rounded-3xl border border-surface"
		:width="width"
		:height="height"
		:logo="{ imageUrl: '/favicon.svg', onClickUrl: 'https://github.com/Rewwoken/wave' }"
		:src="source"
		:colors="colors"
		:loop="true"
	/>
</template>
