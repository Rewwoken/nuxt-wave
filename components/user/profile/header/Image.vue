<script setup lang="ts">
// defineProps<{
//   src: string | null;
// }>();
  const src = 'https://picsum.photos/200/200';

  const displayBasic = ref(false);
</script>

<template>
  <div class="absolute flex justify-center select-none card">
    <Galleria
      v-model:visible="displayBasic"
      :value="[src]"
      :full-screen="true"
      :show-item-navigators="false"
      :show-thumbnails="false"
      :pt="{ root: 'border-0' }"
    >
      <template #item="slotProps">
        <NuxtImg :src="slotProps.item" class="size-96" />
      </template>
    </Galleria>
    <UserImage
      :src="src"
      class="border-[3px] rounded-full cursor-pointer size-36 dark:border-dim"
      @click="displayBasic = true"
    />
  </div>
</template>
