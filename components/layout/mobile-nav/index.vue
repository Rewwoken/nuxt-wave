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
	<nav class="flex items-center justify-between px-4 py-1 bg-white border-t dark:bg-dim border-gray-500/20">
		<LayoutMobileNavLink to="/home" icon="pi-home" />
		<LayoutMobileNavLink to="/explore" icon="pi-hashtag" />
		<LayoutMobileNavLink to="/bookmarks" icon="pi-bookmark" />
		<NuxtLink
			to="/notifications"
			class="flex items-center p-3 rounded-full gap-x-5 hover:bg-gray-500/10"
			aria-label="Navigate to notifications"
			active-class="font-bold"
		>
			<i class="pi pi-bell !relative !text-2xl">
				<Badge
					v-if="count"
					:value="count"
					pt:root:class="!absolute !-top-1 !-right-2 !text-white !font-sans"
					size="small"
				/>
			</i>
		</NuxtLink>
		<LayoutMobileNavLink to="/messages" icon="pi-envelope" />
		<LayoutMobileNavLink :to="`/${currentUser.username}`" icon="pi-user" />
	</nav>
</template>
