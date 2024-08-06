<script setup lang="ts">
	const currentUser = useCurrentUser();
	const { data: count } = await useAPI('/api/notifications/count', {
		method: 'GET',
		dedupe: 'defer',
	});

	useSeoMeta({
		titleTemplate: (titleChunk) => {
			const title = count.value ? `(${count.value}) ${titleChunk}` : titleChunk;

			return `${title} / Wave`;
		},
	});
</script>

<template>
	<nav class="flex items-center mr-0.5 justify-between px-4 py-1 bg-white border-t dark:bg-surface-950 border-t-surface-300 dark:border-t-surface-800">
		<LayoutMobileNavLink to="/home" icon="pi-home" />
		<LayoutMobileNavLink to="/explore" icon="pi-hashtag" />
		<LayoutMobileNavLink to="/bookmarks" icon="pi-bookmark" />
		<NuxtLink
			to="/notifications"
			class="flex items-center p-3 rounded-full gap-x-5 hover:bg-gray-500/10"
			aria-label="Navigate to notifications"
			active-class="font-bold"
		>
			<i class="relative !text-2xl pi pi-bell">
				<Badge
					v-if="count"
					:value="count"
					pt:root:class="absolute font-sans text-white -top-2 -right-2"
					size="small"
				/>
			</i>
		</NuxtLink>
		<LayoutMobileNavLink to="/messages" icon="pi-envelope" />
		<LayoutMobileNavLink :to="`/${currentUser.username}`" icon="pi-user" />
	</nav>
</template>
