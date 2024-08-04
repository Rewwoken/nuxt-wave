<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'onFile', key: 'image', file: File): void;
	}>();

	const { currentUser } = useCurrentUser();
	const image = ref(currentUser.profile.imageUrl);
	const hiddenInput = ref();

	function onClick() {
		hiddenInput.value.click();
	}

	function onFileChange(event: Event) {
		return handleFileChange(event, (file, url) => {
			emit('onFile', 'image', file);

			image.value = url;
		});
	}
</script>

<template>
	<div class="relative w-full h-20">
		<div class="absolute flex items-center justify-center ml-10 bottom-10">
			<UserImage
				:src="image"
				:px="128"
				class="border-white border-[3px] bg-white dark:bg-dim dark:border-dim"
			/>
			<ProfileEditModalFileButton @on-click="onClick" />
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
