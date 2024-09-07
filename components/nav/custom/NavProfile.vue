<script setup lang="ts">
	const props = defineProps<{
		username: string;
	}>();

	const { isProfileRoute } = useIsProfileRoute(props.username);
</script>

<template>
	<NavLink
		icon="pi-user"
		text="Profile"
		:to="`/${username}`"
		:class="{ 'font-bold': isProfileRoute }"
	/>
</template>
