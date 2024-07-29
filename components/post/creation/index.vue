<!-- TODO: implement video upload -->
<!-- TODO: handle replyToId -->
<script setup lang="ts">
  const { currentUser } = useCurrentUser();

  const text = ref('');
  const images = reactive<File[]>([]);
  const imageSources = reactive<string[]>([]);
  const isPending = ref<boolean>(false);

  function resetForm() {
    text.value = '';
    images.splice(0);
    imageSources.splice(0);
  }

  function onImage(file: File, source: string) {
    images.push(file);
    imageSources.push(source);
  }

  function deleteImage(index: number) {
    images.splice(index, 1);
    imageSources.splice(index, 1);
  }

  const toast = useToast();

  async function onSubmit() {
    isPending.value = true;
    const formData = new FormData();

    formData.append('text', text.value);

    images.forEach((file, index) => {
      formData.append(`media/${index + 1}`, file);
    });

    const { $api } = useNuxtApp();
    try {
      await $api('/api/post', {
        method: 'POST',
        body: formData,
      });

      resetForm();
      toast.add({
        severity: 'success',
        summary: 'Successfully created new post!',
        detail: 'Post has been created, please refresh the page.',
        life: 5000,
      });
    }
    catch {
      // TODO: specify errors
      toast.add({
        severity: 'error',
        summary: 'Error creating new post!',
        detail: 'An error occurred during post creation. Please, try again later.',
        life: 5000,
      });
    }
    finally {
      isPending.value = false;
    }
  }
</script>

<template>
  <section class="flex gap-x-4 p-3">
    <UserImage :src="currentUser.profile.imageUrl" class="size-12" />
    <form class="flex w-full flex-col">
      <Textarea
        id="new-post-text"
        v-model="text"
        name="postText"
        placeholder="What is happening?!"
        pt:root:class="!border-none !shadow-none !text-xl !bg-transparent dark:!text-white !min-h-[72px]"
        :auto-resize="true"
      />
      <PostCreationImageList :sources="imageSources" @delete-image="deleteImage" />
      <div class="mt-2 flex justify-between border-t pt-2 dark:border-gray-800">
        <fieldset class="flex items-center gap-x-0.5">
          <PostCreationImageUpload
            accept="image/png, image/jpeg, image/gif"
            icon="pi pi-image"
            @on-file="onImage"
          />
        </fieldset>
        <Button
          type="button"
          label="Create post"
          icon="pi pi-send"
          pt:root:class="!px-8 !py-0 !text-white"
          rounded
          :loading="isPending"
          @click="onSubmit"
        />
      </div>
    </form>
  </section>
</template>
