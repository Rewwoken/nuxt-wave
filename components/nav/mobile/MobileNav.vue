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
	<nav class="mr-0.5 flex items-center justify-between border-t bg-color px-4 py-1 border-surface">
		<MobileNavLink
			to="/home"
			icon="pi-home"
		/>
		<MobileNavLink
			to="/explore"
			icon="pi-hashtag"
		/>
		<MobileNavLink
			to="/bookmarks"
			icon="pi-bookmark"
		/>
		<NuxtLink
			to="/notifications"
			class="flex items-center gap-x-5 rounded-full p-3 hover:bg-emphasis"
			aria-label="Navigate to notifications"
			active-class="font-bold"
		>
			<i class="pi pi-bell relative !text-2xl">
				<Badge
					v-if="count"
					pt:root:class="absolute -right-2 -top-2 font-sans text-white"
					size="small"
					:value="count"
				/>
			</i>
		</NuxtLink>
		<MobileNavLink
			to="/messages"
			icon="pi-envelope"
		/>
		<MobileNavLink
			icon="pi-user"
			:to="`/${currentUser.username}`"
		/>
	</nav>
</template>
