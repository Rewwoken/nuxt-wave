<script setup lang="ts">
  defineProps<{
    user: any;
  }>();
</script>

<template>
  <UserProfileHeader :user="user" />
  <p>BIO</p>
  <ol>
    USER POSTS
  </ol>
</template>
