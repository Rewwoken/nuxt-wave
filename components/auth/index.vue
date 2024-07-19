<script setup lang="ts">
  const visible = ref(false);

  function showModal() {
    visible.value = true;
  }

  function closeModal() {
    visible.value = false;
  }
</script>

<template>
  <AuthLogin />
  <Button
    label="Haven't registered yet?"
    size="small"
    pt:root:class="mt-2 !border-none"
    text
    rounded
    @click="showModal"
  />
  <Dialog
    v-model:visible="visible"
    modal
    header="Create an account"
    :dismissable-mask="true"
    :close-on-escape="true"
    :draggable="false"
  >
    <AuthRegister @close-modal="closeModal" />
  </Dialog>
</template>
