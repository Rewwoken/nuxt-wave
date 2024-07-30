<script setup lang="ts">
  import type { PrismaUser } from '~/types/user.types';

  const route = useRoute();
  const username = route.params.username as string;

  async function getUser(username: string) {
    const { currentUser } = useCurrentUser();
    if (username === currentUser.username) {
      return { user: currentUser, error: null };
    }

    const { data: user, error } = await useApi<PrismaUser | null>(`/api/user/${username}`, {
      method: 'GET',
    });
    return { user: user.value, error };
  }

  const { user, error } = await getUser(username);
  useSeoMeta({
    title: user ? `${user.profile.name} (@${user.username})` : 'Not Found',
  });
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
