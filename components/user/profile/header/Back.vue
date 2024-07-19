<script setup lang="ts">
  const router = useRouter();
</script>

<template>
  <div class="flex gap-x-6">
    <Button
      icon="pi pi-arrow-left"
      severity="contrast"
      text
      @click="router.back"
    />
  </div>
</template>
