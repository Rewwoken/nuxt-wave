<script setup lang="ts">
  const { currentUser } = useCurrentUser();

  const route = useRoute();
  const isCurrentUser = route.path === `/${currentUser.username}`;
</script>

<template>
  <ProfileActionsEdit v-if="isCurrentUser" />
  <div v-else class="flex items-center gap-x-2">
    <ProfileActionsMore />
    <ProfileActionsFollow />
  </div>
</template>
