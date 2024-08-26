<script setup lang="ts">
	const props = defineProps<{
		id: string;
		status: boolean;
	}>();

	const { isBookmarked, toggleBookmark } = usePostBookmark(props.id, props.status);
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
