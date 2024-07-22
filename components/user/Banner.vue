<script setup lang="ts">
  defineProps<{
    src: string | null;
  }>();
</script>

<template>
  <div v-if="src" class="relative flex h-48 w-full items-center overflow-hidden">
    <NuxtImg
      :src="src"
      class="absolute w-full"
    />
  </div>
  <div v-else class="h-48 w-full bg-neutral-500/20" />
</template>
