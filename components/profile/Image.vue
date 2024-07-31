<script setup lang="ts">
  import type { User } from '~/types/api.types';

  const visible = ref(false);

  function showModal() {
    visible.value = true;
  }

  const user = inject('user') as User;
</script>

<template>
  <div class="absolute flex select-none justify-center">
    <UserImage
      :src="user.profile.imageUrl"
      :px="140"
      class="cursor-pointer border-white border-[3px] bg:white dark:bg-dim dark:border-dim"
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
    <UserImage :src="user.profile.imageUrl" :px="384" />
  </Dialog>
</template>
