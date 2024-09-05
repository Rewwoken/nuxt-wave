<script setup lang="ts">
	const props = defineProps<{
		mimetype: string;
		file: File;
	}>();

	defineEmits<{
		(e: 'onDelete'): void;
	}>();

	// Potential improvement: stop generating object URL when the component is remounted
	const url = useObjectUrl(props.file);

	// TODO: add gif badge
	// eslint-disable-next-line unused-imports/no-unused-vars
	const isGif = computed(() => props.mimetype.startsWith('image/gif'));
</script>

<template>
	<div
		v-if="url"
		class="relative overflow-hidden rounded-2xl border border-surface"
	>
		<Button
			icon="pi pi-trash"
			class="!absolute left-2 top-2 z-10"
			severity="blur"
			label="Delete"
			size="small"
			rounded
			@click="$emit('onDelete')"
		/>
		<NewPostImage
			v-if="mimetype.startsWith('image/')"
			:url="url"
		/>
		<NewPostVideo
			v-else-if="mimetype.startsWith('video/')"
			:url="url"
		/>
	</div>
</template>
