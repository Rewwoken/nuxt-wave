<script setup lang="ts">
	defineProps<{
		to: string;
		icon: string;
		text: string;
	}>();
</script>

<template>
	<NuxtLink
		:to="to"
		class="flex items-center p-3 transition-colors rounded-full gap-x-5 hover:bg-surface-400/20"
		:aria-label="`Navigate to ${to}`"
		active-class="font-bold"
	>
		<i :class="`pi ${icon} !text-3xl`" />
		<span class="hidden text-xl xl:inline">{{ text }}</span>
	</NuxtLink>
</template>
