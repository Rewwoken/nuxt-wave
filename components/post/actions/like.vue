<script setup lang="ts">
	const props = defineProps<{
		postId: string;
		isLiked: boolean;
		count: number;
	}>();

	const isLiked = ref(props.isLiked);
	const likesCount = ref(props.count);

	const label = computed(() => String(likesCount.value));

	const { $api } = useNuxtApp();
	async function toggleLike() {
		const method = isLiked.value ? 'DELETE' : 'POST';

		await $api(`/api/post/${props.postId}/like`, {
			method,
		});

		isLiked.value = !isLiked.value;
		likesCount.value += isLiked.value ? 1 : -1;
	}
</script>

<template>
	<Button
		v-if="isLiked"
		:label="label"
		icon="pi pi-heart-fill"
		size="small"
		severity="secondary"
		text
		@click="toggleLike"
	/>
	<Button
		v-else
		:label="label"
		icon="pi pi-heart"
		size="small"
		severity="secondary"
		text
		@click="toggleLike"
	/>
</template>
