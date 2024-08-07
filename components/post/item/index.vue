<script setup lang="ts">
	import type { Post, PostWithLike } from '~/types/api.types';

	defineProps<{
		data: Post | PostWithLike;
	}>();
</script>

<template>
	<article class="flex gap-x-3 w-full px-4 py-2">
		<UserImage :src="data.user.profile!.imageUrl" :px="40" />
		<div class="flex flex-col">
			<div class="space-x-1">
				<span class="text-color font-bold">{{ data.user.profile!.name }}</span>
				<span class="text-muted-color">@{{ data.user.username }}</span>
			</div>
			<p>
				{{ data.text }}
			</p>
		</div>
		<div>
			<!-- TODO: mediafiles -->
		</div>
		<div class="flex justify-between">
			Reposts: {{ data._count.reposts }}
		</div>
		<div>
			Likes: {{ data._count.likedByUsersRelations }}
		</div>
		<div v-if="data.isLiked !== undefined">
			Is Liked: {{ data.isLiked }}
		</div>
	</article>
</template>
