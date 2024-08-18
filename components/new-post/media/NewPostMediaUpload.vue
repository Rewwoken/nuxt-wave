<script setup lang="ts">
	defineProps<{
		accept: string;
		icon: string;
	}>();

	const emit = defineEmits<{
		(e: 'onFileAdd', file: File, source: string): void;
	}>();

	const hiddenInput = ref();
	function onIconClick() {
		hiddenInput.value.click();
	}

	function onChange(event: Event) {
		handleFileChange(event, (file, source) => {
			emit('onFileAdd', file, source);
		});

		// Removing value so user can upload the same image again
		hiddenInput.value.value = null;
	}
</script>

<template>
	<Button
		title="Add file"
		size="large"
		pt:root:class="!ring-0"
		:icon="icon"
		text
		rounded
		@click="onIconClick"
	/>
	<input
		ref="hiddenInput"
		type="file"
		:accept="accept"
		hidden
		@change="onChange"
	>
</template>
