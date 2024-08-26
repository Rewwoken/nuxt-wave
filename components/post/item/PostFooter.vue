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
			:id="postId"
			:count="count.replies"
		/>
		<!-- <PostShare
			:id="postId"
			:author="author"
			:count="count.reposts"
		/> -->
		<PostLike
			:id="postId"
			:status="status.liked"
			:count="count.likes"
		/>
		<div class="space-x-1">
			<PostBookmark
				:id="postId"
				:status="status.bookmarked"
			/>
		</div>
	</div>
</template>
