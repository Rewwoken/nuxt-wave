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
  <div>
    <Button
      label="Haven't registered yet?"
      size="small"
      text
      class="!px-1 !py-0 mt-2 !border-none"
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
  </div>
</template>
