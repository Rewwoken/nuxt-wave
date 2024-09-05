<script setup lang="ts">
	import { PROFILE_BANNER_ALLOWED_MIMES, PROFILE_BANNER_MAX_SIZE } from '~/shared/profile/constants';

	defineProps<{
		url: string | null;
		isCloudinary: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'onFile', file: File): void;
	}>();

	const hiddenInput = ref();

	function onClick() {
		hiddenInput.value.click();
	}

	const { showError } = useNotification();

	function onFileChange(event: Event) {
		const { file } = extractFileInputData(event);

		if (file.size > PROFILE_BANNER_MAX_SIZE) {
			const sizeInMb = (PROFILE_BANNER_MAX_SIZE / 1024 / 1024).toFixed(2);

			return void showError(`File size is too big! Max size is ${sizeInMb} MB.`);
		}

		emit('onFile', file);
	}
</script>

<template>
	<div class="relative flex items-center justify-center">
		<UserBanner
			:cloudinary="isCloudinary"
			:src="url"
			:height="192"
			:width="586"
		/>
		<Button
			icon="pi pi-file-plus"
			severity="contrast"
			pt:root:class="!absolute"
			pt:icon:class="!text-2xl"
			rounded
			@click="onClick"
		/>
	</div>
	<input
		ref="hiddenInput"
		type="file"
		:accept="PROFILE_BANNER_ALLOWED_MIMES.join(',')"
		hidden
		@change="onFileChange"
	>
</template>
