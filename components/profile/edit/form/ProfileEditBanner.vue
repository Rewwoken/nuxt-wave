<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'onFile', file: File): void;
	}>();

	const { authUser } = useAuth();
	const currentBanner = authUser.value.profile!.bannerUrl;

	const banner = ref(currentBanner);
	const hiddenInput = ref();

	function onClick() {
		hiddenInput.value.click();
	}

	function onFileChange(event: Event) {
		const { file, url } = extractFileInputData(event);
		emit('onFile', file);

		banner.value = url;
	}
</script>

<template>
	<div class="relative flex items-center justify-center">
		<UserBanner
			:cloudinary="banner === currentBanner"
			:src="banner"
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
		accept="image/png, image/jpeg, image/webp"
		type="file"
		hidden
		@change="onFileChange"
	>
</template>
