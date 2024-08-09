<script setup lang="ts">
	const props = defineProps<{
		postId: string;
		isBookmarked: boolean;
	}>();

	const isBookmarked = ref(props.isBookmarked);

	const { $api } = useNuxtApp();
	async function toggleBookmark() {
		const method = isBookmarked.value ? 'DELETE' : 'POST';

		await $api(`/api/post/${props.postId}/bookmark`, {
			method,
		});

		isBookmarked.value = !isBookmarked.value;
	}
</script>

<template>
	<Button
		v-if="isBookmarked"
		title="Delete from bookmarks"
		aria-label="Delete from bookmarks"
		icon="pi pi-bookmark-fill"
		severity="secondary"
		size="small"
		text
		@click="toggleBookmark"
	/>
	<Button
		v-else
		title="Add to bookmarks"
		aria-label="Add to bookmarks"
		icon="pi pi-bookmark"
		severity="secondary"
		size="small"
		text
		@click="toggleBookmark"
	/>
</template>
