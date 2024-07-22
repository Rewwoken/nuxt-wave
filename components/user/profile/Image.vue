<script setup lang="ts">
  defineProps<{
    src: string | null;
  }>();

  const displayBasic = ref(false);
</script>

<template>
  <div class="absolute flex select-none justify-center card">
    <Galleria
      v-if="src"
      v-model:visible="displayBasic"
      :value="[src]"
      :full-screen="true"
      :show-item-navigators="false"
      :show-thumbnails="false"
      :pt="{ root: '!border-0' }"
    >
      <template #item="slotProps">
        <NuxtImg :src="slotProps.item" class="rounded-full size-96" />
      </template>
    </Galleria>
    <UserImage
      :src="src"
      class="cursor-pointer rounded-full border-white border-[2px] size-36 dark:border-dim"
      @click="displayBasic = true"
    />
  </div>
</template>
