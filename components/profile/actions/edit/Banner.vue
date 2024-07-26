<script setup lang="ts">
  const emit = defineEmits(['onFile']);

  const { currentUser } = useCurrentUser();
  const banner = ref(currentUser.profile.bannerUrl);
  const hiddenInput = ref();

  function onClick() {
    hiddenInput.value.click();
  }

  function onFileChange(event: Event) {
    return handleFileChange(event, (file, url) => {
      emit('onFile', 'banner', file);

      banner.value = url;
    });
  }
</script>

<template>
  <div class="relative flex items-center justify-center">
    <UserBanner :src="banner" />
    <ProfileActionsEditFileButton @on-click="onClick" />
  </div>
  <input
    ref="hiddenInput"
    accept="image/png, image/jpeg"
    type="file"
    hidden
    @change="onFileChange"
  >
</template>
