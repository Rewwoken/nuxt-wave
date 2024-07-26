<script setup lang="ts">
  defineProps<{
    fileType: string;
    icon: string;
  }>();

  const emit = defineEmits(['onFile']);

  const hiddenInput = ref();
  function onIconClick() {
    hiddenInput.value.click();
  }

  function onFileChange(event: Event) {
    return handleFileChange(event, (file, url) => {
      emit('onFile', file, url);
    });
  }
</script>

<template>
  <Button
    title="Upload image"
    size="large"
    :icon="icon"
    class="!border-none"
    text
    rounded
    @click="onIconClick"
  />
  <input
    ref="hiddenInput"
    type="file"
    :accept="fileType"
    multiple
    hidden
    @change="onFileChange"
  >
</template>
