<script setup lang="ts">
  defineProps<{
    isPending: boolean;
    hasErrors: boolean;
  }>();

  defineEmits(['closeModal']);
</script>

<template>
  <div class="flex justify-between mb-2">
    <Button
      icon="pi pi-times"
      severity="contrast"
      text
      rounded
      @click="$emit('closeModal')"
    />
    <Button
      label="Save"
      size="small"
      severity="contrast"
      :loading="isPending"
      :disabled="hasErrors"
      pt:root:class="px-6"
      rounded
    />
  </div>
</template>
