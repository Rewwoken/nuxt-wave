<script setup lang="ts">
  defineProps<{
    sources: string[];
  }>();

  defineEmits<{
    (e: 'deleteImage', index: number): void;
  }>();
</script>

<template>
  <PostCreationImageItem
    v-if="sources.length === 1"
    :source="sources[0]"
    @on-delete="$emit('deleteImage', 0)"
  />
  <div v-else-if="sources.length === 2" class="grid w-full grid-cols-2 gap-x-1">
    <PostCreationImageItem
      :source="sources[0]"
      @on-delete="$emit('deleteImage', 0)"
    />
    <PostCreationImageItem
      :source="sources[1]"
      @on-delete="$emit('deleteImage', 1)"
    />
  </div>
  <!--  FIXME: slight move on transition from div to Carousel -->
  <Carousel
    v-else-if="sources.length > 2"
    :value="sources"
    :num-visible="2"
    :num-scroll="1"
    :show-indicators="false"
    container-class="!relative"
    :prev-button-props="{ class: '!absolute !z-[1] !left-2 !bg-black !text-white !border-none', rounded: true }"
    :next-button-props="{ class: '!absolute !z-[1] !right-2 !bg-black !text-white !border-none', rounded: true }"
  >
    <template #item="source">
      <div class="relative size-full px-0.5">
        <PostCreationImageItem
          :source="source.data"
          @on-delete="$emit('deleteImage', source.index)"
        />
      </div>
    </template>
  </Carousel>
</template>
