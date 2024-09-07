<script setup lang="ts">
	const { $api } = useNuxtApp();

	const { authUser } = useAuth();
	const { count } = useNotificationsCount();

	await callOnce(async () => {
		const response = await $api('/api/me', {
			method: 'GET',
		});

		authUser.value = response;
	});
</script>

<template>
	<div class="flex min-h-screen justify-center">
		<aside class="sticky top-0 hidden h-full select-none flex-col items-center gap-y-3 pr-4 md:flex xl:w-[300px] xl:items-stretch">
			<NavHome />
			<nav class="flex flex-col gap-y-4">
				<Navigation
					:username="authUser.username"
					:count="count ?? 0"
				/>
			</nav>
			<NewPostModal />
			<UserAccount
				:name="authUser.profile!.name"
				:username="authUser.username"
				:image-url="authUser.profile!.imageUrl"
			/>
		</aside>
		<main class="w-[586px] border-x border-surface lg:mr-4">
			<slot />
			<div class="fixed bottom-0 z-10 w-full max-w-[586px] border-x border-t bg-color border-surface md:hidden">
				<nav class="flex justify-around gap-y-4 p-1">
					<Navigation
						:username="authUser.username"
						:count="count ?? 0"
					/>
				</nav>
			</div>
		</main>
		<aside class="sticky top-0 hidden h-full w-[350px] flex-col gap-y-2 pt-2 lg:flex">
			<Search />
			<ExploreContainer
				title="What's happening"
				footer-link="/"
			>
				<ExploreTags />
			</ExploreContainer>
			<ExploreContainer
				title="You might like"
				footer-link="/"
			>
				<ExploreUsers />
			</ExploreContainer>
			<div class="flex flex-wrap justify-between gap-x-4 gap-y-1 text-nowrap px-2">
				<WebsiteInfo />
			</div>
		</aside>
	</div>
</template>
