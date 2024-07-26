<script setup lang="ts">
  import type { PrismaUser } from '~/types/user.types';

  const visible = ref(false);

  function showModal() {
    visible.value = true;
  }

  const user = inject('user') as PrismaUser;
</script>

<template>
  <div class="absolute flex select-none justify-center">
    <UserImage
      :src="user.profile.imageUrl"
      class="cursor-pointer rounded-full border-white border-[2px] size-36 dark:border-dim"
      @click="showModal"
    />
  </div>
  <Dialog
    v-model:visible="visible"
    pt:root:class="!bg-transparent !border-none !shadow-none !static"
    :dismissable-mask="true"
    :close-on-escape="true"
    :show-header="false"
    :draggable="false"
    modal
  >
    <UserImage :src="user.profile.imageUrl" class="size-96" />
  </Dialog>
</template>
