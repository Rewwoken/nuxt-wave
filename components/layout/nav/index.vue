<script setup lang="ts">
	const currentUser = useCurrentUser();
</script>

<template>
	<NuxtLink
		to="/home"
		class="size-12 rounded-full p-2 transition-colors hover:bg-emphasis"
		aria-label="Home"
	>
		<CommonIconNuxt />
	</NuxtLink>
	<nav class="flex flex-col gap-y-4">
		<LayoutNavLink
			icon="pi-home"
			to="/home"
			text="Home"
		/>
		<LayoutNavLink
			icon="pi-hashtag"
			to="/explore"
			text="Explore"
		/>
		<LayoutNavNotifications />
		<LayoutNavLink
			icon="pi-envelope"
			to="/messages"
			text="Messages"
		/>
		<LayoutNavLink
			icon="pi-bookmark"
			to="/bookmarks"
			text="Bookmarks"
		/>
		<LayoutNavLink
			icon="pi-user"
			text="Profile"
			:to="`/${currentUser.username}`"
		/>
		<LayoutNavLink
			icon="pi-ellipsis-h"
			to="/settings"
			text="Settings"
		/>
	</nav>
</template>
