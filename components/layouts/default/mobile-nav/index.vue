<script setup lang="ts">
	const { currentUser } = useCurrentUser();
	const { theme, toggleTheme } = useTheme();
</script>

<!-- ? TODO: add notifications -->
<template>
	<nav class="flex items-center justify-between px-4 py-1 bg-white border-t dark:bg-dim border-gray-500/20">
		<LayoutsDefaultMobileNavLink to="/home" icon="pi-home" />
		<LayoutsDefaultMobileNavLink to="/explore" icon="pi-hashtag" />
		<LayoutsDefaultMobileNavLink to="/bookmarks" icon="pi-bookmark" />
		<button
			class="p-2 rounded-xl aspect-square"
			@click="toggleTheme"
		>
			<i v-if="theme === 'dark'" class="pi pi-sun !text-2xl" />
			<i v-else class="pi pi-moon !text-2xl" />
		</button>
		<LayoutsDefaultMobileNavLink to="/messages" icon="pi-envelope" />
		<LayoutsDefaultMobileNavLink :to="`/${currentUser.username}`" icon="pi-user" />
	</nav>
</template>
