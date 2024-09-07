<script setup lang="ts">
	import { navItems } from '~/components/nav/nav.data';

	defineProps<{
		username: string;
		count: number;
	}>();

	// TODO: Add notifications count
</script>

<template>
	<NavLink v-bind="navItems[0]" />
	<NavLink v-bind="navItems[1]" />
	<NavLink v-bind="navItems[2]" />
	<NavLink v-bind="navItems[3]" />
	<NavLink v-bind="navItems[4]" />
	<NavProfile :username="username" />
	<NavLink v-bind="navItems[5]" />
</template>
