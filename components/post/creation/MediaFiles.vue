<script setup lang="ts">
  defineProps<{
    sources: string[];
  }>();
</script>

<!-- TODO: make all images the same size -->
<template>
  <NuxtImg
    v-if="sources.length === 1"
    :src="sources[0]"
    class="w-full rounded-2xl"
  />
  <div v-else-if="sources.length === 2" class="grid w-full grid-cols-2 gap-x-2">
    <NuxtImg :src="sources[0]" class="w-full rounded-2xl" />
    <NuxtImg :src="sources[1]" class="w-full rounded-2xl" />
  </div>
  <Galleria
    v-else-if="sources.length > 2"
    :value="sources"
    :num-visible="2"
    :circular="false"
    container-style="border-radius: 1rem"
    :show-item-navigators="true"
    :show-thumbnails="false"
    :show-indicators="true"
    :show-indicators-on-item="true"
  >
    <template #item="slotProps">
      <div class="relative rounded-2xl size-full">
        <NuxtImg :src="slotProps.item" class="!absolute h-[504px] rounded-2xlx" />
      </div>
    </template>
  </Galleria>
</template>
