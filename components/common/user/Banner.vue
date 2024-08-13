<!-- Potential improvement: reduce CommonUserBanner size on mobile -->
<script setup lang="ts">
	const props = defineProps<{
		src: string | null;
		height: number;
		width: number;
	}>();

	// ! Dynamic tw classes are not recommended, therefore I set sizes via style
	// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
	const sizes = {
		width: `${props.width}px`,
		height: `${props.height}px`,
	};
</script>

<template>
	<NuxtImg
		v-if="src"
		provider="cloudinary"
		fit="fill"
		format="avif"
		class="select-none object-cover"
		alt="user image"
		:src="src"
		:height="height"
		:width="width"
		:style="sizes"
		:modifiers="{ gravity: 'faceCenter' }"
	/>
	<div
		v-else
		class="select-none bg-neutral-200 dark:bg-neutral-200/10"
		alt="user image"
		:style="sizes"
	/>
</template>
