<script setup lang="ts">
	defineProps<{
		accept: string;
		icon: string;
	}>();

	const emit = defineEmits<{
		(e: 'onFileAdd', file: File, mimetype: string, url: string): void;
	}>();

	const hiddenInput = ref();
	function onIconClick() {
		hiddenInput.value.click();
	}

	function handleChange(event: Event) {
		const { file, mimetype, url } = handleFileChange(event);
		emit('onFileAdd', file, mimetype, url);

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
		@change="handleChange"
	>
</template>
