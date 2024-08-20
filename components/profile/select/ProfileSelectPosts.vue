<script setup lang="ts">
	import type { FetchedPost } from '~/types/api.types';

	const props = defineProps<{
		userId: string;
	}>();

	const { $api } = useNuxtApp();
	const posts = ref<FetchedPost[]>([]);

	const { data: limit } = await useAPI('/api/post/count', {
		method: 'GET',
		query: {
			userId: props.userId,
		},
		dedupe: 'defer',
	});

	async function loadMore() {
		const nextPosts = await $api('/api/post', {
			method: 'GET',
			query: {
				userId: props.userId,
				skip: posts.value.length,
			},
			deep: false,
		});

		posts.value.push(...nextPosts);
	}

	const canLoadMore = computed(() => {
		return posts.value.length !== limit.value;
	});

	const sentinel = ref<HTMLElement | null>(null);
	useInfiniteScroll(sentinel, 1000, loadMore, canLoadMore);
</script>

<!-- TODO: add posts skeleton -->
<template>
	<Message
		v-if="!limit"
		severity="secondary"
		pt:root:class="m-2"
	>
		User has not uploaded any posts yet.
	</Message>
	<ol
		v-else
		class="flex flex-col"
	>
		<li
			v-for="{ parentPost, ...post } in posts"
			:key="post.id"
			class="w-full cursor-pointer border-b border-surface"
		>
			<PostParent
				v-if="parentPost"
				class="px-4 pt-2"
				:data="parentPost"
			/>
			<Post
				class="px-4 pb-2"
				:class="{ 'pt-2': !parentPost }"
				:data="post"
			/>
		</li>
	</ol>
	<div ref="sentinel" />
	<Message
		v-if="limit && !canLoadMore"
		severity="secondary"
		pt:root:class="m-2"
	>
		That's all user's posts!
	</Message>
</template>
