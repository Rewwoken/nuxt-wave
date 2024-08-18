<script setup lang="ts">
	const props = defineProps<{
		src: string | null;
		px: number;
	}>();

	// ! Dynamic tw classes are not recommended, therefore I set sizes via style
	// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
	const sizes = {
		width: `${props.px}px`,
		height: `${props.px}px`,
	};
</script>

<template>
	<CldImage
		v-if="src"
		class="select-none rounded-full object-cover"
		alt="User image"
		format="avif"
		loading="lazy"
		gravity="center"
		crop="thumb"
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
