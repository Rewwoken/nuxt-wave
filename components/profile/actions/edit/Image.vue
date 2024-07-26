<script setup lang="ts">
  const emit = defineEmits(['onFile']);

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
  <div class="relative h-20 w-full">
    <div class="absolute bottom-10 ml-10 flex items-center justify-center">
      <UserImage
        :src="image"
        class="!size-32 border-white border-2"
      />
      <ProfileActionsEditFileButton @on-click="onClick" />
    </div>
  </div>
  <input
    ref="hiddenInput"
    accept="image/png, image/jpeg"
    type="file"
    hidden
    @change="onFileChange"
  >
</template>
