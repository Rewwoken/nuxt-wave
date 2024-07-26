<script setup lang="ts">
  import type { PrismaUser } from '~/types/user.types';

  const route = useRoute();
  const username = route.params.username as string;

  async function getUser(username: string) {
    const { currentUser } = useCurrentUser();
    if (username === currentUser.username) {
      return { data: currentUser, error: null };
    }

    return useApi<PrismaUser | null>(`/api/user/${username}`, {
      method: 'GET',
    });
  }

  const { data: user, error } = await getUser(username);
</script>

<template>
  <Profile v-if="user" :user="user" />
  <div v-else-if="error && error.data.message === 'error/invalid'">
    INVALID
  </div>
  <div v-else>
    NOT FOUND
  </div>
</template>
