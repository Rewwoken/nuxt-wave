<script setup lang="ts">
  defineProps<{
    user: any;
  }>();
</script>

<template>
  <UserProfileBack />
  <UserBanner :src="user.profile.bannerUrl" />
  <div class="relative mt-2 flex items-end px-3">
    <UserProfileImage :src="user.profile.imageUrl" />
    <UserProfileActions class="ml-auto" />
  </div>
  <p>BIO</p>
  <ol>
    USER POSTS
  </ol>
</template>
