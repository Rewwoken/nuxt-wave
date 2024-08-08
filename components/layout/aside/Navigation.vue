<script setup lang="ts">
	const currentUser = useCurrentUser();
</script>

<template>
	<NuxtLink
		to="/home"
		class="p-2 transition-colors rounded-full size-12 hover:bg-gray-500/10"
		aria-label="Home"
	>
		<IconNuxt />
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
			:to="`/${currentUser.username}`"
			text="Profile"
		/>
		<LayoutAsideNavLink
			icon="pi-ellipsis-h"
			to="/settings"
			text="Settings"
		/>
	</nav>
</template>
