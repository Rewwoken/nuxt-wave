<script setup lang="ts">
	interface Item {
		url: string;
		mimetype: string;
	}

	defineProps<{
		items: Array<Item>;
	}>();

	const isMobile = toValue(useMediaQuery('(max-width: 767px)'));
	const DEFAULT_SIZE = 500;
	const MULTIPLE_SIZE = computed(() => isMobile ? DEFAULT_SIZE : (DEFAULT_SIZE / 2));

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
		:size="DEFAULT_SIZE"
	/>
	<div
		v-else-if="items.length === 2"
		class="grid w-full grid-cols-2 gap-x-1"
	>
		<PostMedia
			:url="items[0].url"
			:mimetype="items[0].mimetype"
			:size="MULTIPLE_SIZE"
		/>
		<PostMedia
			:url="items[1].url"
			:mimetype="items[1].mimetype"
			:size="MULTIPLE_SIZE"
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
		<template #item="item">
			<div class="size-full px-0.5">
				<PostMedia
					:url="item.data.url"
					:mimetype="item.data.mimetype"
					:size="MULTIPLE_SIZE"
				/>
			</div>
		</template>
	</Carousel>
</template>
