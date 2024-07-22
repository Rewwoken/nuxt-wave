<!-- WIP -->
<script setup lang="ts">
  const menu = ref();

  const items = ref([
    {
      items: [
      // TODO...
      ],
    },
  ]);

  function toggle(event: Event) {
    menu.value.toggle(event);
  }
</script>

<template>
  <div class="flex justify-center card">
    <Button
      type="button"
      icon="pi pi-ellipsis-h"
      severity="contrast"
      outlined
      rounded
      text
      @click="toggle"
    />
    <Menu
      ref="menu"
      :model="items"
      :popup="true"
      pt:submenu-label:class="!hidden"
    />
  </div>
</template>
