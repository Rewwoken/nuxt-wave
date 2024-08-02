<script setup lang="ts">
	const { currentUser } = useCurrentUser();

	const links = [
		{ to: '/messages', icon: 'pi-envelope', text: 'Messages' },
		{ to: '/bookmarks', icon: 'pi-bookmark', text: 'Bookmarks' },
		{ to: '/lists', icon: 'pi-file', text: 'Lists' },
		{ to: `/${currentUser.username}`, icon: 'pi-user', text: 'Profile' },
		{ to: '/more', icon: 'pi-ellipsis-h', text: 'More' },
	];
</script>

<template>
	<NuxtLink
		to="/home"
		class="rounded-full p-2 transition-colors size-12 hover:bg-gray-500/10"
		aria-label="Home"
	>
		<IconNuxt />
	</NuxtLink>
	<nav class="flex flex-col gap-y-4">
		<NuxtLink
			to="/home"
			class="flex items-center gap-x-5 rounded-full p-3 hover:bg-gray-500/10"
			aria-label="Navigate to /home"
			active-class="font-bold"
		>
			<i class="pi pi-home" style="font-size: 1.6rem" />
			<span class="hidden text-xl xl:inline">Home</span>
		</NuxtLink>
		<NuxtLink
			to="/explore"
			class="flex items-center gap-x-5 rounded-full p-3 hover:bg-gray-500/10"
			aria-label="Navigate to /explore"
			active-class="font-bold"
		>
			<i class="pi pi-hashtag" style="font-size: 1.6rem" />
			<span class="hidden text-xl xl:inline">Explore</span>
		</NuxtLink>
		<LayoutsDefaultLeftNotifications />
		<NuxtLink
			v-for="link in links"
			:key="link.to"
			:to="link.to"
			class="flex items-center gap-x-5 rounded-full p-3 hover:bg-gray-500/10"
			:aria-label="`Navigate to ${link.to}`"
			active-class="font-bold"
		>
			<i :class="`pi ${link.icon}`" style="font-size: 1.6rem" />
			<span class="hidden text-xl xl:inline">{{ link.text }}</span>
		</NuxtLink>
	</nav>
</template>
