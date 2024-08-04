<script setup lang="ts">
	const { data: count } = useAPI('/api/notifications/count', {
		method: 'GET',
		dedupe: 'defer',
	});

	useSeoMeta({
		titleTemplate: (titleChunk) => {
			return `(${count.value}) ${titleChunk} / Wave`;
		},
	});

	const { fetchCurrentUser } = useCurrentUser();
	await callOnce(fetchCurrentUser);
</script>

<template>
	<NuxtLoadingIndicator />
	<div class="flex justify-center min-h-screen">
		<aside class="hidden md:flex flex-col gap-y-3 pr-4 items-end xl:items-stretch xl:w-[300px]">
			<LayoutsDefaultLeftNavigation />
			<PostCreationModal />
			<LayoutsDefaultLeftAccount />
		</aside>
		<main class="w-[586px] border-x lg:mr-4 overflow-hidden border-x-gray-500/20">
			<slot />
			<div class="fixed bottom-0 max-w-[586px] w-full md:hidden">
				<LayoutsDefaultMobileNav />
			</div>
		</main>
		<aside class="hidden lg:flex flex-col gap-y-2 w-[350px] pt-2">
			<LayoutsDefaultRightSearch />
			<LayoutsDefaultRightWrapper
				title="What's happening"
				footer-link="/"
			>
				<LayoutsDefaultRightTags />
			</LayoutsDefaultRightWrapper>
			<LayoutsDefaultRightWrapper
				title="You might like"
				footer-link="/"
			>
				<LayoutsDefaultRightUsers />
			</LayoutsDefaultRightWrapper>
			<div class="flex flex-wrap justify-between px-2 text-nowrap gap-x-4 gap-y-2">
				<WebsiteInfo />
			</div>
		</aside>
	</div>
</template>
