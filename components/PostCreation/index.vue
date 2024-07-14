<script setup lang="ts">
	const { data: user } = useFetch('/api/me', {
		method: 'GET',
	});

	const text = ref('');

	const files = reactive<File[]>([]);
	const sources = reactive<string[]>([]);

	function onFile(file: File, source: string) {
		files.push(file);
		sources.push(source);
	}

	function onSubmit() {
		const formData = new FormData();

		formData.append('text', text.value);

		files.forEach((file, index) => {
			formData.append(`media/${index}`, file);
		});

		// TODO: handle replyToId
		useFetch('/api/post', {
			method: 'POST',
			body: formData,
		});
	}
</script>

<template>
	<section v-if="user" class="flex p-3 gap-x-4">
		<UserAvatar :src="user.image" />
		<form class="flex flex-col w-full">
			<textarea
				id="new-post-text"
				v-model="text"
				name="postText"
				class="mt-2 overflow-y-visible text-xl bg-transparent border-none outline-none resize-none"
				placeholder="What is happening?!"
			/>
			<PostCreationMediaFiles :sources="sources" />
			<div class="flex justify-between mt-2">
				<fieldset class="flex items-center gap-x-0.5">
					<PostCreationAddFile
						file-type="image/png, image/jpeg"
						icon="pi pi-image"
						@on-file="onFile"
					/>
					<PostCreationAddFile
						file-type="image/gif"
						icon="pi pi-file"
						@on-file="onFile"
					/>
				</fieldset>
				<Button
					type="button"
					label="Post"
					class="px-6 py-1 !text-white"
					rounded
					@click="onSubmit"
				/>
			</div>
		</form>
	</section>
</template>
