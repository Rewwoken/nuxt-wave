<script setup lang="ts">
	defineProps<{
		accept: string;
		icon: string;
	}>();

	const emit = defineEmits<{
		(e: 'addMedia', file: File, source: string): void;
	}>();

	const hiddenInput = ref();
	function onIconClick() {
		hiddenInput.value.click();
	}

	function onFileChange(event: Event) {
		handleFileChange(event, (file, source) => {
			emit('addMedia', file, source);
		});

		// Removing value so user can upload the same image again
		hiddenInput.value.value = null;
	}
</script>

<template>
	<Button
		title="Upload image"
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
		@change="onFileChange"
	>
</template>
