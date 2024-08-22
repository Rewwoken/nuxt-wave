<script setup lang="ts">
	import type { Post } from '~/types/api.types';

	const props = defineProps<{
		data: Post;
	}>();

	const item = ref();
	const router = useRouter();

	// TODO: refactor redirect
	async function navigateToPost(event: MouseEvent) {
		if (item.value === event.target) {
			const username = props.data.user.username;
			const id = props.data.id;

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
			:is-parent="true"
			:image-url="data.user.profile!.imageUrl"
		/>
		<div class="flex w-full flex-col pb-8">
			<PostHeader
				:name="data.user.profile!.name"
				:username="data.user.username"
				:time="data.createdAt"
			/>
			<p class="flex gap-3 py-px">
				{{ data.text }}
			</p>
			<PostMediaList
				class="mt-2"
				:items="data.mediaFiles"
			/>
		</div>
	</article>
</template>
