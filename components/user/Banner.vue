<script setup lang="ts">
  defineProps<{
    src: string | null;
  }>();
</script>

<template>
  <div class="h-48 w-full overflow-hidden border-y border-gray-200 dark:border-gray-800">
    <NuxtImg
      v-if="src"
      :src="src"
      alt="user image"
      class="object-cover size-full"
    />
    <div
      v-else
      class="bg-neutral-200 size-full dark:bg-neutral-200/10"
    />
  </div>
</template>
