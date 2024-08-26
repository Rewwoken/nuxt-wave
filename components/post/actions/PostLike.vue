<script setup lang="ts">
	const props = defineProps<{
		id: string;
		status: boolean;
		count: number;
	}>();

	const { isLiked, toggleLike, likesCount } = usePostLike(props.id, props.status, props.count);
	const label = computed(() => String(likesCount.value));
</script>

<template>
	<Button
		v-if="isLiked"
		title="Delete post like"
		aria-label="Delete post like"
		icon="pi pi-heart-fill"
		severity="secondary"
		size="small"
		:label="label"
		text
		@click="toggleLike"
	/>
	<Button
		v-else
		title="Add post like"
		aria-label="Add post like"
		icon="pi pi-heart"
		severity="secondary"
		size="small"
		:label="label"
		text
		@click="toggleLike"
	/>
</template>
