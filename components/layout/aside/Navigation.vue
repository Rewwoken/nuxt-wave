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
		<LayoutAsideNavLink
			icon="pi-home"
			to="/home"
			text="Home"
		/>
		<LayoutAsideNavLink
			icon="pi-hashtag"
			to="/explore"
			text="Explore"
		/>
		<LayoutAsideNotifications />
		<LayoutAsideNavLink
			icon="pi-envelope"
			to="/messages"
			text="Messages"
		/>
		<LayoutAsideNavLink
			icon="pi-bookmark"
			to="/bookmarks"
			text="Bookmarks"
		/>
		<LayoutAsideNavLink
			icon="pi-user"
			text="Profile"
			:to="`/${currentUser.username}`"
		/>
		<LayoutAsideNavLink
			icon="pi-ellipsis-h"
			to="/settings"
			text="Settings"
		/>
	</nav>
</template>
