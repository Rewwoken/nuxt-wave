<script setup lang="ts">
	defineProps<{
		sources: string[];
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
		v-if="sources.length === 1"
		:source="sources[0]"
	/>
	<div
		v-else-if="sources.length === 2"
		class="grid w-full grid-cols-2 gap-x-1"
	>
		<NewPostMedia
			:source="sources[0]"
		/>
		<NewPostMedia
			:source="sources[1]"
		/>
	</div>
	<Carousel
		v-else-if="sources.length > 2"
		container-class="!relative"
		:value="sources"
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
				:source="item.data"
			/>
		</template>
	</Carousel>
</template>
