<!-- Potential improvement: reduce CommonUserBanner size on mobile -->
<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			cloudinary?: boolean;
			src: string | null;
			height: number;
			width: number;
		}>(),
		{
			cloudinary: true,
		},
	);

	// ! Dynamic tw classes are not recommended, therefore I set sizes via style
	// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
	const sizes = {
		width: `${props.width}px`,
		height: `${props.height}px`,
	};
</script>

<template>
	<CldImage
		v-if="cloudinary && src"
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
	<NuxtImg
		v-else-if="src"
		class="max-w-full select-none object-cover"
		:src="src"
		:style="sizes"
	/>
	<div
		v-else
		class="select-none bg-neutral-200 dark:bg-neutral-200/10"
		:style="sizes"
	/>
</template>
