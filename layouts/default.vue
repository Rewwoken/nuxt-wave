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
	<div class="flex justify-center min-h-screen">
		<aside class="hidden md:flex flex-col gap-y-3 pr-4 items-center xl:items-stretch xl:w-[300px] select-none">
			<LayoutAsideNavigation />
			<PostCreationModal />
			<LayoutAsideAccount />
		</aside>
		<main class="w-[586px] border-x lg:mr-4 overflow-hidden border-x-surface-300 dark:border-x-surface-800">
			<slot />
			<div class="fixed bottom-0 max-w-[586px] w-full md:hidden">
				<LayoutMobileNav />
			</div>
		</main>
		<aside class="hidden lg:flex flex-col gap-y-2 w-[350px] pt-2">
			<LayoutAsideSearch />
			<LayoutAsideBox
				title="What's happening"
				footer-link="/"
			>
				<LayoutAsideTags />
			</LayoutAsideBox>
			<LayoutAsideBox
				title="You might like"
				footer-link="/"
			>
				<LayoutAsideUsers />
			</LayoutAsideBox>
			<div class="flex flex-wrap justify-between px-2 text-nowrap gap-x-4 gap-y-2">
				<WebsiteInfo />
			</div>
		</aside>
	</div>
</template>
