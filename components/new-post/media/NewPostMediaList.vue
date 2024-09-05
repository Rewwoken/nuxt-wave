<script setup lang="ts">
	interface MediaItem {
		file: File;
		mimetype: string;
	}

	defineProps<{
		items: MediaItem[];
	}>();

	defineEmits<{
		(e: 'deleteMedia', index: number): void;
	}>();

	const responsiveOptions = ref([
		{
			breakpoint: '767px',
			numVisible: 1,
			numScroll: 1,
		},
	]);
</script>

<template>
	<NewPostMedia
		v-if="items.length === 1"
		:mimetype="items[0].mimetype"
		:file="items[0].file"
		@on-delete="$emit('deleteMedia', 0)"
	/>
	<div
		v-else-if="items.length === 2"
		class="grid w-full grid-cols-2"
	>
		<NewPostMedia
			class="mx-0.5"
			:mimetype="items[0].mimetype"
			:file="items[0].file"
			@on-delete="$emit('deleteMedia', 0)"
		/>
		<NewPostMedia
			class="mx-0.5"
			:mimetype="items[1].mimetype"
			:file="items[1].file"
			@on-delete="$emit('deleteMedia', 1)"
		/>
	</div>
	<Carousel
		v-else-if="items.length > 2"
		container-class="!relative"
		:value="items"
		:num-visible="2"
		:num-scroll="1"
		:show-indicators="false"
		:prev-button-props="{ class: '!absolute z-[1] left-2 disabled:opacity-0 duration-300', rounded: true, severity: 'blur' }"
		:next-button-props="{ class: '!absolute z-[1] right-2 disabled:opacity-0 duration-300', rounded: true, severity: 'blur' }"
		:responsive-options="responsiveOptions"
	>
		<template #item="{ data, index }">
			<NewPostMedia
				class="mx-0.5"
				:mimetype="data.mimetype"
				:file="data.file"
				@on-delete="$emit('deleteMedia', index)"
			/>
		</template>
	</Carousel>
</template>
