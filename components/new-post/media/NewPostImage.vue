<script setup lang="ts">
	defineProps<{
		url: string;
	}>();
</script>

<template>
	<NuxtImg
		class="aspect-square w-full rounded-2xl object-cover"
		:src="url"
	/>
</template>
