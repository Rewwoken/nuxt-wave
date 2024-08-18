<script setup lang="ts">
	defineProps<{
		source: string;
	}>();
</script>

<template>
	<NuxtImg
		class="aspect-square w-full rounded-2xl object-cover"
		:src="source"
	/>
</template>
