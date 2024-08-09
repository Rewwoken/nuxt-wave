<script setup lang="ts">
	import type { Post } from '~/types/api.types';

	defineProps<{
		data: Post;
	}>();
</script>

<template>
	<article class="flex w-full gap-x-3 px-4 py-2">
		<CommonUserImage
			:src="data.user.profile!.imageUrl"
			:px="40"
		/>
		<div class="flex flex-col">
			<div class="space-x-1">
				<span class="font-bold text-color">{{ data.user.profile!.name }}</span>
				<span class="text-muted-color">@{{ data.user.username }}</span>
			</div>
			<p>
				{{ data.text }}
			</p>
			<ol class="my-2">
				<!-- TODO: add mediafiles -->
			</ol>
			<div class="flex justify-between">
				<!-- TODO: add replies -->
				<PostActionsRepost :count="data._count.reposts" />
				<PostActionsLike
					:post-id="data.id"
					:is-liked="data.status.liked"
					:count="data._count.likedByUsersRelations"
				/>
				<div class="space-x-1">
					<PostActionsBookmark
						:post-id="data.id"
						:is-bookmarked="data.status.bookmarked"
					/>
				</div>
			</div>
		</div>
	</article>
</template>
