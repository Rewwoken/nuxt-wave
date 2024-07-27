<script setup lang="ts">
  const visible = ref(false);
</script>

<template>
  <Button
    label="Edit profile"
    severity="contrast"
    size="small"
    pt:root:class="!px-5 !ml-auto"
    pt:label:class="!font-bold"
    rounded
    outlined
    @click="visible = true"
  />
  <Dialog
    v-model:visible="visible"
    modal
    header="Edit profile"
    :dismissable-mask="true"
    :close-on-escape="true"
    :draggable="false"
    :style="{ width: '35rem' }"
    pt:root:class="!shadow-md dark:!bg-dim dark:!border-none dark:!text-white"
  >
    <template #container="{ closeCallback }">
      <ProfileEditForm @close-modal="closeCallback" />
    </template>
  </Dialog>
</template>
