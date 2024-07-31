<script setup lang="ts">
  defineProps<{
    src: string | null;
    px: number;
  }>();
</script>

<template>
  <NuxtImg
    v-if="src"
    provider="cloudinary"
    fit="fill"
    :src="src"
    :width="px"
    :height="px"
    :style="{ width: `${px}px`, height: `${px}px` }"
    :modifiers="{ roundCorner: 'max', gravity: 'faceCenter' }"
    class="rounded-full object-cover"
    alt="user image"
  />
  <NuxtImg
    v-else
    :width="px"
    :height="px"
    src="/placeholders/user-image.png"
    class="rounded-full object-cover"
    :style="{ width: `${px}px`, height: `${px}px` }"
  />
</template>
