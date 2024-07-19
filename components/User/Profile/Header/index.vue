<script setup lang="ts">
  defineProps<{
    user: any;
  }>();
</script>

<template>
  <UserProfileHeaderBack />
  <UserProfileHeaderBanner />
  <div class="relative flex items-end px-3 mt-2">
    <UserProfileHeaderImage />
    <UserProfileHeaderActions class="ml-auto" />
  </div>
</template>
