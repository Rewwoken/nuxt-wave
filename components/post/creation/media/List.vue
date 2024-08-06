<script setup lang="ts">
	defineProps<{
		items: Array<{ file: File; source: string }>;
	}>();

	defineEmits<{
		(e: 'deleteMedia', index: number): void;
	}>();
</script>

<template>
	<PostCreationMediaItem
		v-if="items.length === 1"
		:source="items[0].source"
		@on-delete="$emit('deleteMedia', 0)"
	/>
	<div v-else-if="items.length === 2" class="grid w-full grid-cols-2 gap-x-1">
		<PostCreationMediaItem
			:source="items[0].source"
			@on-delete="$emit('deleteMedia', 0)"
		/>
		<PostCreationMediaItem
			:source="items[1].source"
			@on-delete="$emit('deleteMedia', 1)"
		/>
	</div>
	<!--	FIXME: slight move on transition from div to Carousel -->
	<!--	FIXME: Carousel component is broken in primevue-tailwind -->
	<!--	TODO: :num-visible="1" on mobile -->
	<Carousel
		v-else-if="items.length > 2"
		:value="items"
		:num-visible="2"
		:num-scroll="1"
		:show-indicators="false"
		container-class="!relative"
		:prev-button-props="{ class: '!absolute z-[1] left-2', rounded: true, severity: 'contrast' }"
		:next-button-props="{ class: '!absolute z-[1] right-2', rounded: true, severity: 'contrast' }"
	>
		<template #item="item">
			<div class="size-full px-0.5">
				<PostCreationMediaItem
					:source="item.data.source"
					@on-delete="$emit('deleteMedia', item.index)"
				/>
			</div>
		</template>
	</Carousel>
</template>
