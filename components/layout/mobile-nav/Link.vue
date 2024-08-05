<script setup lang="ts">
	defineProps<{
		to: string;
		icon: string;
	}>();
</script>

<template>
	<NuxtLink
		:to="to"
		active-class="bg-neutral-500/10"
		class="flex items-center justify-center px-3 py-2 rounded-xl"
		:aria-label="`Navigate to ${to}`"
	>
		<i :class="`!text-2xl pi ${icon}`" />
	</NuxtLink>
</template>
