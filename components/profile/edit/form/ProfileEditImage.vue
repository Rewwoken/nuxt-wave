<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'onFile', file: File): void;
	}>();

	const { authUser } = useAuth();
	const currentImage = authUser.value.profile!.imageUrl;

	const image = ref(currentImage);
	const hiddenInput = ref();

	function onClick() {
		hiddenInput.value.click();
	}

	function onFileChange(event: Event) {
		const { file, url } = extractFileInputData(event);
		emit('onFile', file);

		image.value = url;
	}
</script>

<template>
	<div class="relative h-12 w-full">
		<div class="absolute bottom-4 ml-6 flex items-center justify-center">
			<UserImage
				class="cursor-pointer border-[3px] border-bg-color bg-color"
				:cloudinary="image === currentImage"
				:src="image"
				:px="128"
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
	</div>
	<input
		ref="hiddenInput"
		accept="image/png, image/jpeg, image/webp"
		type="file"
		hidden
		@change="onFileChange"
	>
</template>
