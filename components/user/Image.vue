<script setup lang="ts">
  defineProps<{
    src: string | null;
  }>();
</script>

<template>
  <div class="relative flex items-center overflow-hidden rounded-full dark:border dark:border-gray-800">
    <NuxtImg
      v-if="src"
      :src="src"
      alt="user image"
      class="absolute min-h-full min-w-full"
    />
    <div
      v-else
      class="bg-neutral-200 size-full dark:bg-dim"
    />
  </div>
</template>
