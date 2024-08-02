<script setup lang="ts">
	const { fetchCurrentUser } = useCurrentUser();
	await callOnce(fetchCurrentUser);

	const { $api } = useNuxtApp();
	const { data: count } = useAsyncData('notifications-count', () => {
		return $api('/api/notifications/count');
	});

	useSeoMeta({
		titleTemplate: (titleChunk) => {
			return `(${count.value}) ${titleChunk} / Wave`;
		},
	});
</script>

<!-- TODO: add bottom navigation on mobile -->
<template>
	<NuxtLoadingIndicator />
	<div class="flex justify-center">
		<aside class="hidden md:flex flex-col gap-y-3 pr-4 items-end xl:items-stretch xl:w-[320px]">
			<LayoutsDefaultLeftNavigation />
			<LayoutsDefaultLeftPost />
			<LayoutsDefaultLeftAccount />
		</aside>
		<main class="md:w-[586px] border-x mr-4 overflow-hidden">
			<slot />
		</main>
		<aside class="hidden lg:flex flex-col gap-y-2 w-[350px]">
			<LayoutsDefaultRightSearch />
			<LayoutsDefaultRightWhatsHappening />
			<LayoutsDefaultRightMightLike />
			<div class="flex flex-wrap justify-between px-2 text-nowrap gap-x-4 gap-y-2">
				<WebsiteInfo />
			</div>
		</aside>
	</div>
</template>
