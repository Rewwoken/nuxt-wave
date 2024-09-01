<script setup lang="ts">
	defineProps<{
		to: string;
		icon: string;
		text: string;
	}>();
</script>

<template>
	<NuxtLink
		class="flex items-center gap-x-5 rounded-full p-3 transition-colors hover:bg-emphasis"
		active-class="font-bold"
		:aria-label="`Navigate to ${to}`"
		:to="to"
	>
		<i :class="`pi ${icon} !text-3xl`" />
		<span class="hidden text-xl xl:inline">{{ text }}</span>
	</NuxtLink>
</template>
