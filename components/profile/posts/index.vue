<script setup lang="ts">
	const props = defineProps<{
		userId: string;
	}>();

	const { data: posts, status } = await useAPI('/api/post/with-like', {
		method: 'GET',
		query: {
			userId: props.userId,
		},
		lazy: true,
		server: false,
		deep: false, // ! Change it, if you want need reactivity
	});
</script>

<!-- TODO: display skeletons based on /post/count value -->
<template>
	<ol v-if="status === 'success'">
		<li
			v-for="post in posts"
			:key="post.id"
			class="border-surface border-t w-full"
		>
			<PostItem :data="post" />
		</li>
	</ol>
	<!-- TODO: handle other statuses -->
	<span v-else-if="status === 'pending' || status === 'idle'">LOADING POSTS...</span>
	<span v-else-if="status === 'error'">ERROR FETCHING POSTS</span>
</template>
