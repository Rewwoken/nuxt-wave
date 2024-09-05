<script setup lang="ts">
	import { PROFILE_IMAGE_ALLOWED_MIMES, PROFILE_IMAGE_MAX_SIZE } from '~/shared/profile/constants';

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

		if (file.size > PROFILE_IMAGE_MAX_SIZE) {
			const sizeInMb = (PROFILE_IMAGE_MAX_SIZE / 1024 / 1024).toFixed(2);

			return void showError(`File size is too big! Max size is ${sizeInMb} MB.`);
		}

		emit('onFile', file);
	}
</script>

<template>
	<div class="relative h-12 w-full">
		<div class="absolute bottom-4 ml-6 flex items-center justify-center">
			<UserImage
				class="cursor-pointer border-[3px] border-bg-color bg-color"
				:cloudinary="isCloudinary"
				:src="url"
				:px="128"
			/>
			<Button
				aria-label="Upload image"
				icon="pi pi-file-plus"
				severity="contrast"
				pt:root:class="!absolute"
				pt:icon:class="!text-2xl"
				rounded
				@click="onClick"
			/>
		</div>
	</div>
	<input
		ref="hiddenInput"
		type="file"
		:accept="PROFILE_IMAGE_ALLOWED_MIMES.join(',')"
		hidden
		@change="onFileChange"
	>
</template>
