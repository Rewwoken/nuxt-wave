<script setup lang="ts">
	const { $api } = useNuxtApp();
	const data = useCurrentUser();

	await callOnce(async () => {
		const response = await $api('/api/me', {
			method: 'GET',
		});

		data.value = response;
	});
</script>

<template>
	<div class="flex min-h-screen justify-center">
		<aside class="sticky top-0 hidden h-full select-none flex-col items-center gap-y-3 pr-4 md:flex xl:w-[300px] xl:items-stretch">
			<LayoutNav />
			<LayoutPostModal />
			<LayoutUserAccount />
		</aside>
		<main class="w-[586px] border-x border-surface lg:mr-4">
			<slot />
			<nav class="fixed bottom-0 w-full max-w-[586px] md:hidden">
				<LayoutMobileNav />
			</nav>
		</main>
		<aside class="sticky top-0 hidden h-full w-[350px] flex-col gap-y-2 pt-2 lg:flex">
			<LayoutUserSearch />
			<LayoutExploreBox
				title="What's happening"
				footer-link="/"
			>
				<LayoutExploreTags />
			</LayoutExploreBox>
			<LayoutExploreBox
				title="You might like"
				footer-link="/"
			>
				<LayoutExploreUsers />
			</LayoutExploreBox>
			<div class="flex flex-wrap justify-between gap-x-4 gap-y-1 text-nowrap px-2">
				<CommonWebsiteInfo />
			</div>
		</aside>
	</div>
</template>
