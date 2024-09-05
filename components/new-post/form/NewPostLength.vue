<script setup lang="ts">
	import { POST_TEXT_MAX_LENGTH } from '~/shared/post/constants';

	const props = defineProps<{
		length: number;
	}>();

	const knobModel = defineModel<number>({
		get: () => props.length,
	});
</script>

<template>
	<Knob
		v-model="knobModel"
		class="mr-3 mt-1.5"
		:value-template="value => ''"
		:max="POST_TEXT_MAX_LENGTH"
		:min="0"
		:stroke-width="10"
		:size="30"
		readonly
	/>
</template>
