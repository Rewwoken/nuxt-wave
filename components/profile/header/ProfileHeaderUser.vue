<script setup lang="ts">
	const props = defineProps<{
		userId: string;
		name: string;
	}>();

	const { data: count } = await useAPI('/api/post/count', {
		method: 'GET',
		query: {
			userId: props.userId,
		},
	});
</script>

<template>
	<div class="flex flex-col overflow-hidden leading-4">
		<span class="text-xl font-bold">{{ name }}</span>
		<span class="text-xs text-muted-color">{{ count }} posts</span>
	</div>
</template>
