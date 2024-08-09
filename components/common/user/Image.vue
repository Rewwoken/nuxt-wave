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
	<NuxtImg
		v-if="src"
		provider="cloudinary"
		fit="fill"
		format="avif"
		class="select-none rounded-full object-cover"
		alt="user image"
		loading="lazy"
		:src="src"
		:width="px"
		:height="px"
		:style="sizes"
		:modifiers="{ roundCorner: 'max', gravity: 'faceCenter' }"
	/>
	<NuxtImg
		v-else
		src="/placeholders/user-image.webp"
		class="select-none rounded-full object-cover"
		alt="user image"
		loading="lazy"
		:width="px"
		:height="px"
		:style="sizes"
	/>
</template>
