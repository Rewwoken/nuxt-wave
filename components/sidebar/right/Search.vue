<script setup lang="ts">
  const term = ref('');
</script>

<template>
  <div
    class="flex w-full items-center gap-x-4 rounded-full bg-slate-400/20 p-2 px-4"
  >
    <i class="pi pi-search size-4" />
    <input
      v-model="term"
      type="text"
      class="w-full bg-transparent outline-none"
      placeholder="Search"
    >
  </div>
</template>
