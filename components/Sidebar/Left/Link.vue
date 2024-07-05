<script setup lang="ts">
	defineProps<{ to: string; icon: string; text: string }>();
</script>

<template>
	<NuxtLink :to="to" class="flex items-center p-3 rounded-full gap-x-5 hover:bg-gray-500/10">
		<i :class="`text-2xl pi ${icon}`" />
		<span class="hidden text-xl xl:inline">{{ text }}</span>
	</NuxtLink>
</template>
