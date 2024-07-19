<script setup lang="ts">
  const { currentUser } = useCurrentUser();

  const route = useRoute();
  const isCurrentUser = route.path === `/${currentUser.username}`;
</script>

<template>
  <UserProfileHeaderActionsEdit v-if="isCurrentUser" />
  <div v-else class="flex items-center gap-x-2">
    <UserProfileHeaderActionsMore />
    <UserProfileHeaderActionsFollow />
  </div>
</template>
