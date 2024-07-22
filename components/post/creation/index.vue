<script setup lang="ts">
  const { currentUser } = useCurrentUser();

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
      formData.append(`media/${index + 1}`, file);
    });

    // TODO: handle replyToId
    useFetch('/api/post', {
      method: 'POST',
      body: formData,
    });
  }
</script>

<template>
  <section class="flex gap-x-4 p-3">
    <UserImage :src="currentUser.profile.image" class="size-12 min-w-12 min-h-12" />
    <form class="flex w-full flex-col">
      <textarea
        id="new-post-text"
        v-model="text"
        name="postText"
        class="mt-2 resize-none overflow-y-visible border-none bg-transparent text-xl outline-none"
        placeholder="What is happening?!"
      />
      <PostCreationMediaFiles :sources="sources" />
      <div class="mt-2 flex justify-between">
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
