<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  });

  const route = useRoute();
</script>

<template>
  <p>
    {{ route.params.code }}
  </p>
</template>
