<script setup lang="ts">
  defineProps<{
    isPending: boolean;
    hasErrors: boolean;
  }>();

  defineEmits<{
    (e: 'closeModal'): void;
    (e: 'onSubmit'): void;
  }>();
</script>

<template>
  <div class="mb-2 flex justify-between px-2 pt-3">
    <Button
      icon="pi pi-times"
      severity="contrast"
      pt:root:class="!border-0"
      outlined
      rounded
      @click="$emit('closeModal')"
    />
    <Button
      label="Save"
      severity="contrast"
      size="small"
      :loading="isPending"
      :disabled="hasErrors"
      pt:root:class="!px-8"
      rounded
      @click="$emit('onSubmit')"
    />
  </div>
</template>
