<script setup lang="ts">
	const { authUser } = useAuth();
</script>

<template>
	<NuxtLink
		to="/home"
		class="size-12 rounded-full p-2 transition-colors hover:bg-emphasis"
		aria-label="Home"
	>
		<IconNuxt />
	</NuxtLink>
	<nav class="flex flex-col gap-y-4">
		<NavLink
			icon="pi-home"
			to="/home"
			text="Home"
		/>
		<NavLink
			icon="pi-hashtag"
			to="/explore"
			text="Explore"
		/>
		<NavNotifications />
		<NavLink
			icon="pi-envelope"
			to="/messages"
			text="Messages"
		/>
		<NavLink
			icon="pi-bookmark"
			to="/bookmarks"
			text="Bookmarks"
		/>
		<NavProfile :username="authUser .username" />
		<NavLink
			icon="pi-ellipsis-h"
			to="/settings"
			text="Settings"
		/>
	</nav>
</template>
