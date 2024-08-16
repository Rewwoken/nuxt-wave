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
		<PostActionsReply
			:post-id="postId"
			:count="count.replies"
		/>
		<PostActionsShare
			:post-id="postId"
			:author="author"
			:count="count.reposts"
		/>
		<PostActionsLike
			:post-id="postId"
			:is-liked="status.liked"
			:count="count.likedByUsersRelations"
		/>
		<div class="space-x-1">
			<PostActionsBookmark
				:post-id="postId"
				:is-bookmarked="status.bookmarked"
			/>
		</div>
	</div>
</template>
