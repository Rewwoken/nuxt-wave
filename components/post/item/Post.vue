<script setup lang="ts">
	import type { Post } from '~/types/api.types';

	const props = defineProps<{
		role?: 'root' | 'parent' | 'reply';
		post: Post;
	}>();

	const item = ref();
	const router = useRouter();

	// TODO: refactor redirect
	async function navigateToPost(event: MouseEvent) {
		if (item.value === event.target) {
			const username = props.post.user.username;
			const id = props.post.id;

			await router.push(`/${username}/post/${id}`);
		}
	}
</script>

<template>
	<article
		ref="item"
		class="flex w-full gap-x-3 transition-colors hover:bg-emphasis"
		@click="navigateToPost"
	>
		<PostAside
			:role="role"
			:image-url="post.user.profile!.imageUrl"
		/>
		<div
			class="flex w-full flex-col pb-1"
			:class="{ 'pt-2': !!role }"
		>
			<PostHeader
				:name="post.user.profile!.name"
				:username="post.user.username"
				:time="post.createdAt"
			/>
			<PostText :data="post.text" />
			<PostMediaList
				class="my-2"
				:items="post.mediaFiles"
			/>
			<PostFooter
				:post-id="post.id"
				:author="post.user.username"
				:count="post._count"
				:status="post.status"
				:class="{ 'mt-2': !post.mediaFiles.length }"
			/>
		</div>
	</article>
</template>
