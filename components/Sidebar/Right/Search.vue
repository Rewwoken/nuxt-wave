<script setup lang="ts">
  const term = ref('');
</script>

<template>
  <div class="flex items-center w-full p-2 px-4 rounded-full gap-x-4 bg-slate-400/20">
    <i class="pi pi-search size-4" />
    <input
      v-model="term"
      type="text"
      class="w-full bg-transparent outline-none"
      placeholder="Search"
    >
  </div>
</template>
