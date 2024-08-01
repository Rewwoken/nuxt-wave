<script setup lang="ts">
  defineProps<{
    source: string;
  }>();

  defineEmits<{
    (e: 'onDelete'): void;
  }>();
</script>

<template>
  <div class="relative">
    <Button
      label="Delete"
      icon="pi pi-trash"
      severity="contrast"
      size="small"
      pt:root:class="!absolute !m-2 !px-5 !bg-opacity-40 !bg-black/70 !backdrop-blur-sm hover:!bg-black/80 !border-none !text-white !z-10"
      rounded
      @click="$emit('onDelete')"
    />
    <NuxtImg
      v-if="source.startsWith('data:image/')"
      :src="source"
      class="aspect-square w-full rounded-2xl object-cover"
    />
    <video
      v-else-if="source.startsWith('data:video/')"
      class="aspect-square w-full rounded-2xl object-cover"
      controls
      playsinline
      loop
    >
      <source :src="source">
    </video>
    <div
      v-if="source.startsWith('data:image/gif')"
      class="absolute bottom-2 left-2 rounded-md bg-black px-2 text-sm text-white p-0.5"
    >
      GIF
    </div>
  </div>
</template>
