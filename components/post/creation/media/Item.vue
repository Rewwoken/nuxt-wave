<script setup lang="ts">
	defineProps<{
		source: string;
	}>();

	defineEmits<{
		(e: 'onDelete'): void;
	}>();
</script>

<template>
	<div class="relative">
		<Button
			label="Delete"
			icon="pi pi-trash"
			severity="contrast"
			size="small"
			pt:root:class="!absolute m-2"
			rounded
			@click="$emit('onDelete')"
		/>
		<NuxtImg
			v-if="source.startsWith('data:image/')"
			class="aspect-square w-full rounded-2xl object-cover"
			:src="source"
		/>
		<video
			v-else-if="source.startsWith('data:video/')"
			class="aspect-square w-full rounded-2xl object-cover"
			controls
			playsinline
			loop
		>
			<source :src="source">
		</video>
		<Tag
			v-if="source.startsWith('data:image/gif')"
			value="GIF"
			severity="contrast"
			pt:root:class="!absolute !bottom-2 !left-2"
		/>
	</div>
</template>
