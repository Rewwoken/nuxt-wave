<script setup lang="ts">
	const props = defineProps<{
		userId: string;
	}>();

	const { threads, loadMore } = await useProfileThreads(props.userId);
	const { data: limit } = await useProfileThreadsCount(props.userId);

	const canLoadMore = computed(() => {
		return limit.value !== null && threads.value.length < limit.value;
	});

	const list = ref<HTMLElement | null>(null);
	const cleanup = useInfiniteWindowScroll(list, canLoadMore, loadMore, {
		distance: 500,
		direction: 'bottom',
	});

	onUnmounted(cleanup);
</script>

<template>
	<ol
		ref="list"
		class="flex flex-col"
	>
		<li
			v-for="thread in threads"
			:key="thread.post.id"
			class="w-full cursor-pointer border-b border-surface"
		>
			<PostThread :thread="thread" />
		</li>
	</ol>
	<Message
		v-if="!canLoadMore && limit !== 0"
		severity="secondary"
		pt:root:class="m-2"
	>
		That's all the threads!
	</Message>
</template>
