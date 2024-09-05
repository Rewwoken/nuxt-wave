<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			cloudinary?: boolean;
			src: string | null;
			px: number;
		}>(),
		{
			cloudinary: true,
		},
	);

	// ! Dynamic tw classes are not recommended, therefore set sizes via style
	// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
	const sizes = {
		width: `${props.px}px`,
		height: `${props.px}px`,
	};
</script>

<template>
	<CldImage
		v-if="cloudinary && src"
		class="select-none rounded-full object-cover"
		alt="User image"
		format="webp"
		loading="lazy"
		gravity="center"
		crop="thumb"
		:src="src"
		:style="sizes"
		:width="px"
		:height="px"
	/>
	<NuxtImg
		v-else-if="src"
		class="select-none rounded-full object-cover"
		:src="src"
		:style="sizes"
		:width="px"
		:height="px"
	/>
	<NuxtImg
		v-else
		src="/placeholders/user-image.webp"
		class="select-none rounded-full object-cover"
		alt="User image placeholder"
		loading="lazy"
		:width="px"
		:height="px"
		:style="sizes"
	/>
</template>
