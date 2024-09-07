<script setup lang="ts">
	interface Item {
		url: string;
		mimetype: string;
	}

	const props = defineProps<{
		items: Array<Item>;
	}>();

	const { dimensions } = usePostMediaDimensions(props.items.length);

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
		v-bind="dimensions"
	/>
	<div
		v-else-if="items.length === 2"
		class="grid w-full grid-cols-2 gap-x-1"
	>
		<PostMedia
			:url="items[0].url"
			:mimetype="items[0].mimetype"
			v-bind="dimensions"
		/>
		<PostMedia
			:url="items[1].url"
			:mimetype="items[1].mimetype"
			v-bind="dimensions"
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
					v-bind="dimensions"
				/>
			</div>
		</template>
	</Carousel>
</template>
