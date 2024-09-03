<script setup lang="ts">
	const props = defineProps<{
		parentId?: string;
	}>();

	const emit = defineEmits<{
		(event: 'onSuccess'): void;
	}>();

	const { authUser } = useAuth();

	const {
		hasErrors,
		handleSubmit,
		isSubmitting,
		resetForm,
	} = useZodForm(createPostSchema);
	const { items, handleMediaAdd, handleMediaDelete } = useNewPostMedia();
	const { submitNewPost } = useNewPostRequest();

	function onSuccess() {
		items.value = [];
		resetForm();
		emit('onSuccess');
	}

	const onSubmit = handleSubmit(async (values) => {
		await submitNewPost(values, items, props.parentId, onSuccess);
	});
</script>

<template>
	<UserImage
		:src="authUser.profile!.imageUrl"
		:px="48"
	/>
	<form
		class="flex w-full flex-col"
		@submit="onSubmit"
	>
		<NewPostText />
		<NewPostMediaList
			:items="items"
			@delete-media="handleMediaDelete"
		/>
		<div class="mt-2 flex justify-between border-t pt-2 border-surface">
			<fieldset class="flex items-center gap-x-0.5">
				<NewPostMediaUpload
					icon="pi pi-image"
					accept="image/png, image/jpeg, image/gif, video/mp4, video/*"
					@on-file-add="handleMediaAdd"
				/>
			</fieldset>
			<Button
				type="button"
				label="Create post"
				icon="pi pi-send"
				pt:root:class="px-8"
				:loading="isSubmitting"
				:disabled="hasErrors"
				rounded
				@click="onSubmit"
			/>
		</div>
	</form>
</template>
