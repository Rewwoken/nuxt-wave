<script setup lang="ts">
  defineProps<{
    src: string | null;
  }>();
</script>

<template>
  <NuxtImg
    v-if="src"
    :src="src"
    alt="user image"
    class="aspect-square rounded-full object-cover dark:border dark:border-gray-800"
  />
  <div
    v-else
    class="rounded-full bg-neutral-200 size-full dark:bg-dim dark:border dark:border-gray-800"
  />
</template>
