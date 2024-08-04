<script setup lang="ts">
	const { currentUser } = useCurrentUser();
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
		<LayoutsDefaultLeftNavLink icon="pi-home" to="/home" text="Home" />
		<LayoutsDefaultLeftNavLink icon="pi-hashtag" to="/explore" text="Explore" />
		<LayoutsDefaultLeftNotifications />
		<LayoutsDefaultLeftNavLink icon="pi-envelope" to="/messages" text="Messages" />
		<LayoutsDefaultLeftNavLink icon="pi-bookmark" to="/bookmarks" text="Bookmarks" />
		<LayoutsDefaultLeftNavLink icon="pi-user" :to="`/${currentUser.username}`" text="Profile" />
		<LayoutsDefaultLeftNavLink icon="pi-ellipsis-h" to="/more" text="More" />
	</nav>
</template>
