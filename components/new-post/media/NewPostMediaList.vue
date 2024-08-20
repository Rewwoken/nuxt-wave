<script setup lang="ts">
	import type { MediaItem } from '~/types/new-post.types';

	defineProps<{
		items: MediaItem[];
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
		:url="items[0].url"
	/>
	<div
		v-else-if="items.length === 2"
		class="grid w-full grid-cols-2 gap-x-1"
	>
		<NewPostMedia
			:mimetype="items[0].mimetype"
			:url="items[0].url"
		/>
		<NewPostMedia
			:mimetype="items[1].mimetype"
			:url="items[1].url"
		/>
	</div>
	<Carousel
		v-else-if="items.length > 2"
		container-class="!relative"
		:value="items"
		:num-visible="2"
		:num-scroll="1"
		:show-indicators="false"
		:prev-button-props="{ class: '!absolute z-[1] left-2 border-none', rounded: true, severity: 'contrast' }"
		:next-button-props="{ class: '!absolute z-[1] right-2 border-none', rounded: true, severity: 'contrast' }"
		:responsive-options="responsiveOptions"
	>
		<template #item="item">
			<NewPostMedia
				class="size-full px-0.5"
				:mimetype="item.data.mimetype"
				:url="item.data.url"
			/>
		</template>
	</Carousel>
</template>
