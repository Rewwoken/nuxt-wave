<script setup lang="ts">
	defineProps<{
		src: string | null;
		height: number;
		width: number;
	}>();
</script>

<template>
	<NuxtImg
		v-if="src"
		provider="cloudinary"
		fit="fill"
		:src="src"
		:height="height"
		:width="width"
		format="webp"
		:modifiers="{ gravity: 'faceCenter' }"
		:style="{ height: `${height}px`, width: `${width}px` }"
		class="object-cover select-none"
		alt="user image"
	/>
	<div
		v-else
		class="bg-neutral-200 dark:bg-neutral-200/10 select-none"
		:style="{ height: `${height}px`, width: `${width}px` }"
		alt="user image"
	/>
</template>
