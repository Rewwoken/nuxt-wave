<script setup lang="ts">
	import { createPostSchema } from '~/schemas/post/create-post';

	const props = defineProps<{
		parentId?: string;
	}>();

	const emit = defineEmits<{
		(event: 'onSubmit'): void;
	}>();

	interface MediaItem {
		file: File;
		source: string;
	}

	const currentUser = useCurrentUser();
	const items = ref<MediaItem[]>([]);

	function addMedia(file: File, source: string) {
		items.value.push({ file, source });
	}

	function deleteMedia(index: number) {
		items.value.splice(index, 1);
	}

	const { handleSubmit, errors, defineField, isSubmitting, resetForm } = useForm({
		validationSchema: toTypedSchema(createPostSchema),
	});
	const [text] = defineField('text');
	const hasErrors = computed(() => !!Object.keys(errors.value).length);

	const { handleRequest } = useHandleRequest();

	const { $api } = useNuxtApp();
	const toast = useToast();

	const onSubmit = handleSubmit(async (values) => {
		const formData = new FormData();

		formData.append('text', values.text);
		items.value.forEach((media, index) => {
			formData.append(`media/${index + 1}`, media.file);
		});

		await handleRequest({
			requestFunc: () => $api('/api/post', {
				method: 'POST',
				body: formData,
				query: {
					parentId: props.parentId,
				},
			}),
			onSuccess: async () => {
				emit('onSubmit');

				items.value = [];
				resetForm();

				toast.add({
					severity: 'info',
					summary: 'Success!',
					detail: 'Post has been successfully created.',
					life: 3000,
				});
			},
			errors: {
				'error/size': 'File size is too much! Allow for a maximum of 15 MB.',
				'error/invalid-type': 'Invalid file type!',
				'error/unknown': 'Unexpected error!',
			},
			onError: (message) => {
				toast.add({
					severity: 'error',
					summary: 'Error creating new post!',
					detail: message,
					life: 3000,
				});
			},
		});
	});
</script>

<template>
	<CommonUserImage
		:src="currentUser.profile!.imageUrl"
		:px="48"
	/>
	<form class="flex w-full flex-col">
		<Textarea
			id="new-post-text"
			v-model="text"
			name="postText"
			placeholder="What is happening?!"
			pt:root:class="resize-none border-none !bg-transparent text-xl"
			:auto-resize="true"
		/>
		<PostCreationMediaList
			:items="items"
			@delete-media="deleteMedia"
		/>
		<div class="mt-2 flex justify-between border-t pt-2 border-surface">
			<fieldset class="flex items-center gap-x-0.5">
				<PostCreationMediaUpload
					icon="pi pi-image"
					accept="image/png, image/jpeg, image/gif, video/mp4, video/*"
					@add-media="addMedia"
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
