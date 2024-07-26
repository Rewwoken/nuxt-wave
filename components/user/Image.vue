<script setup lang="ts">
  defineProps<{
    src: string | null;
  }>();
</script>

<template>
  <div class="overflow-hidden rounded-full dark:border dark:border-gray-800">
    <NuxtImg
      v-if="src"
      :src="src"
      alt="user image"
      class="object-cover size-full"
    />
    <div
      v-else
      class="bg-neutral-200 size-full dark:bg-dim"
    />
  </div>
</template>
