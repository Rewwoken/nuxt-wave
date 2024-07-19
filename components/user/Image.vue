<script setup lang="ts">
  defineProps<{
    src: string | null;
  }>();
</script>

<template>
  <NuxtImg v-if="src" :src="src" alt="user image" class="rounded-full" />
  <Avatar
    v-else
    icon="pi pi-user"
    size="large"
    shape="circle"
    class="dark:bg-dim dark:border dark:border-gray-800"
  />
</template>
