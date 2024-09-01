<script setup lang="ts">
	const props = defineProps<{
		userId: string;
	}>();

	const { posts, loadMore } = await useProfilePosts(props.userId);
	const { data: limit } = await useProfilePostsCount(props.userId);

	const canLoadMore = computed(() => {
		return limit.value !== null && posts.value.length < limit.value;
	});

	const list = ref<HTMLElement | null>(null);
	const cleanup = useInfiniteWindowScroll(list, canLoadMore, loadMore, {
		distance: 500,
		direction: 'bottom',
	});

	onUnmounted(cleanup);
</script>

<template>
	<ol
		ref="list"
		class="flex flex-col"
	>
		<li
			v-for="post in posts"
			:key="post.id"
			class="w-full cursor-pointer border-b border-surface"
		>
			<Post
				class="px-4 py-3"
				:post="post"
			/>
		</li>
	</ol>
</template>
