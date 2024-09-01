<script setup lang="ts">
	import type { Thread } from '~/types/api.types';

	const props = defineProps<{
		thread: Thread;
	}>();

	// If parent post is the same as root post, hide the parent post (means it's a reply to the root post)
	const showParent = computed(() => {
		return props.thread.parentPost.id !== props.thread.rootPost.id;
	});

	const showMore = computed(() => {
		const isReplyToRoot = props.thread.parentPost.id === props.thread.rootPost.id;
		const isParentReplyToRoot = props.thread.parentPost.parentPost?.id === props.thread.rootPost.id;

		return !isReplyToRoot && !isParentReplyToRoot;
	});
</script>

<template>
	<section>
		<Post
			role="root"
			class="px-4"
			:post="thread.rootPost"
		/>
		<PostThreadMore
			v-if="showMore"
			class="px-4"
			:root-id="thread.rootPost.id"
		/>
		<Post
			v-if="showParent"
			role="parent"
			class="px-4"
			:post="thread.parentPost"
		/>
		<Post
			role="reply"
			class="px-4"
			:post="thread.post"
		/>
	</section>
</template>
