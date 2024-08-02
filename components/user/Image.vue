<script setup lang="ts">
	defineProps<{
		src: string | null;
		px: number;
	}>();
</script>

<template>
	<NuxtImg
		v-if="src"
		provider="cloudinary"
		fit="fill"
		:src="src"
		:width="px"
		:height="px"
		format="webp"
		:style="{ width: `${px}px`, height: `${px}px` }"
		:modifiers="{ roundCorner: 'max', gravity: 'faceCenter' }"
		class="rounded-full object-cover select-none"
		alt="user image"
		loading="lazy"
	/>
	<NuxtImg
		v-else
		:width="px"
		:height="px"
		src="/placeholders/user-image.webp"
		class="rounded-full object-cover select-none"
		:style="{ width: `${px}px`, height: `${px}px` }"
		alt="user image"
		loading="lazy"
	/>
</template>
