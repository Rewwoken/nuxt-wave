<script setup lang="ts">
	import type { Thread } from '~/types/api.types';

	const props = defineProps<{
		thread: Thread;
	}>();

	// If parent post is the same as root post, hide the parent post (means it's a reply to the root post)
	const showParent = computed(() => {
		return props.thread.parentPost.id !== props.thread.rootPost.id;
	});

	// If parent is not a reply to the root post, show "more" button
	const showMore = computed(() => {
		return props.thread.parentPost?.parentPost?.id !== props.thread.rootPost.id;
	});
</script>

<template>
	<section>
		<Post
			role="root"
			class="px-2"
			:post="thread.rootPost"
		/>
		<PostThreadMore
			v-if="showMore"
			class="px-2"
			:root-id="thread.rootPost.id"
		/>
		<Post
			v-if="showParent"
			role="parent"
			class="px-2"
			:post="thread.parentPost"
		/>
		<Post
			role="reply"
			class="px-2"
			:post="thread.post"
		/>
	</section>
</template>
