<script setup lang="ts">
	import { POST_MAX_FILES_QUANTITY } from '~/shared/post/constants';

	const props = defineProps<{
		parentId?: string;
	}>();

	const emit = defineEmits<{
		(event: 'onSuccess'): void;
	}>();

	const { authUser } = useAuth();
	const userImage = computed(() => authUser.value.profile!.imageUrl);

	const {
		hasErrors,
		handleSubmit,
		isSubmitting,
		resetForm,
		values,
	} = useZodForm(createPostSchema);
	const length = computed(() => values.text?.length ?? 0);

	const { items, handleMediaAdd, handleMediaDelete, clear } = useNewPostMedia();
	const canAddMoreMedia = computed(() => items.length < POST_MAX_FILES_QUANTITY);

	const { submitNewPost } = useNewPostRequest();

	function onSuccess() {
		emit('onSuccess');
		resetForm();
		clear();
	}

	const onSubmit = handleSubmit(async (values) => {
		const files = computed(() => items.map(item => item.file));
		await submitNewPost(values, files, props.parentId, onSuccess);
	});
</script>

<template>
	<UserImage
		:src="userImage"
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
		<div class="mt-2 flex items-center justify-center border-t pt-2 border-surface">
			<NewPostUpload
				:disabled="!canAddMoreMedia"
				@on-file-add="handleMediaAdd"
			/>
			<NewPostLength
				class="ml-auto"
				:length="length"
			/>
			<NewPostSubmit
				:disabled="hasErrors"
				:loading="isSubmitting"
			/>
		</div>
	</form>
</template>
