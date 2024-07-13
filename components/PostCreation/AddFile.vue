<script setup lang="ts">
	defineProps<{
		fileType: string;
		icon: string;
	}>();

	const emit = defineEmits(['onFile']);

	const hiddenInput = ref();

	function onIconClick() {
		hiddenInput.value.click();
	}

	function onFileChange(event: Event) {
		// @ts-expect-error | .files property actually exists
		const file = event.target.files[0] as File;

		const fileReader = new FileReader();

		fileReader.onload = (event) => {
			const url = event.target?.result;

			emit('onFile', file, url);
		};

		fileReader.readAsDataURL(file);
	}
</script>

<template>
	<Button
		title="Upload image"
		size="large"
		:icon="icon"
		class="text-xs !border-none"
		text
		@click="onIconClick"
	/>
	<input
		ref="hiddenInput"
		type="file"
		:accept="fileType"
		multiple
		hidden
		@change="onFileChange"
	>
</template>
