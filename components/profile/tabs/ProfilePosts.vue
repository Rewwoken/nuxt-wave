<script setup lang="ts">
	const props = defineProps<{
		userId: string;
	}>();

	const {
		posts,
		loadMore,
		loadingMore,
	} = await useProfilePosts(props.userId);

	// Limit fetch during SSR is intentional to dedupe API calls.
	const { data: limit } = await useProfilePostsCount(props.userId);
	const canLoadMore = computed(() => {
		return posts.value.length !== limit.value;
	});

	const sentinel = ref<HTMLElement | null>(null);
	useInfiniteScroll(sentinel, 1000, loadMore, canLoadMore);
</script>

<!-- TODO: add posts skeleton -->
<template>
	<ol class="flex flex-col">
		<li
			v-for="post in posts"
			:key="post.id"
			class="w-full cursor-pointer border-b border-surface"
		>
			<Post
				class="px-4 py-2"
				:data="post"
			/>
		</li>
	</ol>
	<div ref="sentinel" />
	<span v-if="loadingMore">
		SKELETON
	</span>
	<Message
		v-if="limit && !loadingMore && !canLoadMore"
		severity="secondary"
		pt:root:class="m-2"
	>
		That's all user's posts!
	</Message>
</template>
