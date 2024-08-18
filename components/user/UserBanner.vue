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
	<CldImage
		v-if="src"
		class="!max-w-full select-none object-cover"
		alt="user image"
		format="avif"
		loading="lazy"
		gravity="center"
		crop="thumb"
		:src="src"
		:style="sizes"
		:height="height"
		:width="width"
	/>
	<div
		v-else
		class="select-none bg-neutral-200 dark:bg-neutral-200/10"
		:style="sizes"
	/>
</template>
