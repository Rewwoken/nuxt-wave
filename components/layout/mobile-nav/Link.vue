<script setup lang="ts">
	defineProps<{
		to: string;
		icon: string;
	}>();
</script>

<template>
	<NuxtLink
		active-class="bg-emphasis"
		class="flex items-center justify-center rounded-xl px-3 py-2"
		:aria-label="`Navigate to ${to}`"
		:to="to"
	>
		<i :class="`!text-2xl pi ${icon}`" />
	</NuxtLink>
</template>
