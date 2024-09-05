<script setup lang="ts">
	defineProps<{
		url: string;
	}>();
</script>

<template>
	<NuxtImg
		class="aspect-[9/10] w-full object-cover"
		:src="url"
	/>
</template>
