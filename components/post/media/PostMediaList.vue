<script setup lang="ts">
	interface Item {
		url: string;
		mimetype: string;
	}

	defineProps<{
		items: Array<Item>;
	}>();

	const SOLO_SIZE = 500 as const;
	const MULTIPLE_SIZE = 245 as const;

	// resolveUnref so it computes size only once and doesn't spam requests on resize
	const shouldDisplayOne = resolveUnref(useMediaQuery('(max-width: 767px)'));
	const size = computed(() => shouldDisplayOne ? SOLO_SIZE : MULTIPLE_SIZE);

	const responsiveOptions = ref([
		{
			breakpoint: '767px',
			numVisible: 1,
			numScroll: 1,
		},
	]);
</script>

<template>
	<PostMedia
		v-if="items.length === 1"
		:url="items[0].url"
		:mimetype="items[0].mimetype"
		:size="size"
	/>
	<div
		v-else-if="items.length === 2"
		class="grid w-full grid-cols-2 gap-x-1"
	>
		<PostMedia
			:url="items[0].url"
			:mimetype="items[0].mimetype"
			:size="size"
		/>
		<PostMedia
			:url="items[1].url"
			:mimetype="items[1].mimetype"
			:size="size"
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
			<div class="size-full px-0.5">
				<PostMedia
					:url="item.data.url"
					:mimetype="item.data.mimetype"
					:size="size"
				/>
			</div>
		</template>
	</Carousel>
</template>
