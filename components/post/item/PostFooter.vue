<script setup lang="ts">
	import type { Post } from '~/types/api.types';

	defineProps<{
		postId: string;
		author: string;
		count: Post['_count'];
		status: Post['status'];
	}>();
</script>

<template>
	<div class="flex justify-between">
		<PostReply
			:post-id="postId"
			:count="count.replies"
		/>
		<PostShare
			:post-id="postId"
			:author="author"
			:count="count.reposts"
		/>
		<PostLike
			:post-id="postId"
			:is-liked="status.liked"
			:count="count.likes"
		/>
		<div class="space-x-1">
			<PostBookmark
				:post-id="postId"
				:is-bookmarked="status.bookmarked"
			/>
		</div>
	</div>
</template>
