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
		icon="pi pi-bookmark-fill"
		size="small"
		severity="secondary"
		text
		@click="toggleBookmark"
	/>
	<Button
		v-else
		icon="pi pi-bookmark"
		size="small"
		severity="secondary"
		text
		@click="toggleBookmark"
	/>
</template>
