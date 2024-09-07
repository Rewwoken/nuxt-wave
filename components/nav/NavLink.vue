<script setup lang="ts">
	import type { NavItem } from '~/components/nav/nav.data';

	const props = defineProps<NavItem>();
	const iconClass = `pi ${props.icon} !text-3xl`;
</script>

<template>
	<NuxtLink
		class="flex items-center gap-x-5 rounded-full p-3 transition-colors hover:bg-emphasis"
		active-class="font-bold bg-emphasis md:bg-transparent"
		:to="to"
	>
		<i :class="iconClass" />
		<span class="hidden text-xl xl:inline">{{ text }}</span>
	</NuxtLink>
</template>
