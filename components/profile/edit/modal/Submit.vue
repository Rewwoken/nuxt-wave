<!-- FIXME: SplitButton does not have :loading API -->
<script setup lang="ts">
  defineProps<{
    isPending: boolean;
    hasErrors: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'deleteImage'): void;
    (e: 'deleteBanner'): void;
    (e: 'onSubmit'): void;
  }>();

  const items = [
    {
      label: 'Delete image',
      icon: 'pi pi-times',
      command: () => {
        emit('deleteImage');
      },
    },
    {
      label: 'Delete banner',
      icon: 'pi pi-times',
      command: () => {
        emit('deleteBanner');
      },
    },
  ];
</script>

<template>
  <div class="flex justify-center">
    <SplitButton
      label="Save"
      severity="contrast"
      size="small"
      icon="pi pi-check"
      :loading="isPending"
      :disabled="hasErrors"
      :model="items"
      dropdown-icon="pi pi-cog"
      rounded
      @click="$emit('onSubmit')"
    />
  </div>
</template>
