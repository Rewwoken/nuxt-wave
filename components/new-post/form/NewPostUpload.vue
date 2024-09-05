<script setup lang="ts">
	import { POST_ALLOWED_MIMES, POST_MAX_FILE_SIZE_BYTES } from '~/shared/post/constants';

	defineProps<{
		disabled: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'onFileAdd', file: File, mimetype: string): void;
	}>();

	const hiddenInput = ref();
	function onIconClick() {
		hiddenInput.value.click();
	}

	const { showError } = useNotification();
	function handleChange(event: Event) {
		const { file, mimetype } = extractFileInputData(event);

		if (file.size > POST_MAX_FILE_SIZE_BYTES) {
			const sizeInMb = (POST_MAX_FILE_SIZE_BYTES / 1024 / 1024).toFixed(2);

			return void showError(`File size is too big! Max size is ${sizeInMb} MB.`);
		}

		emit('onFileAdd', file, mimetype);

		// Removing value so user can upload the same image again
		hiddenInput.value.value = null;
	}
</script>

<template>
	<Button
		title="Add file"
		size="large"
		class="!ring-0"
		icon="pi pi-image"
		:disabled="disabled"
		text
		rounded
		@click="onIconClick"
	/>
	<input
		ref="hiddenInput"
		type="file"
		:accept="POST_ALLOWED_MIMES.join(', ')"
		hidden
		@change="handleChange"
	>
</template>
