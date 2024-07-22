<script setup lang="ts">
  const router = useRouter();

  // const { currentUser } = useCurrentUser();
</script>

<!-- TODO: add currentUser name & posts count -->
<template>
  <div class="flex gap-x-6">
    <Button
      icon="pi pi-arrow-left"
      severity="contrast"
      pt:root:class="!border-0 !rounded-none"
      outlined
      @click="router.back"
    />
  </div>
</template>
