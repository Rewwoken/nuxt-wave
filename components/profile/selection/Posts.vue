<script setup lang="ts">
	const props = defineProps<{
		userId: string;
	}>();

	const { data: posts, status } = await useAPI('/api/post', {
		method: 'GET',
		query: {
			userId: props.userId,
		},
		deep: false, // ! Change it, if you want need reactivity
		lazy: true,
		server: false,
	});
</script>

<!-- TODO: display skeletons based on /post/count value -->
<template>
	<ol v-if="status === 'success'">
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
			<PostItem
				class="px-4 pb-2"
				:class="{ 'pt-2': !parentPost }"
				:data="post"
			/>
		</li>
	</ol>
	<!-- TODO: handle other statuses -->
	<span v-else-if="status === 'pending' || status === 'idle'">LOADING POSTS...</span>
	<span v-else-if="status === 'error'">ERROR FETCHING POSTS</span>
</template>
