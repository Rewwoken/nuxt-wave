<script setup lang="ts">
  const { params } = useRoute();
  const username = params.username as string;

  async function getUser(username: string) {
    const { currentUser } = useCurrentUser();
    if (username === currentUser.username) {
      return {
        data: currentUser,
        error: null,
      };
    }

    return await useFetch(`/api/user/${username}`, {
      method: 'GET',
    });
  }

  const { data: user, error } = await getUser(username);
</script>

<template>
  <UserProfile v-if="user" :user="user" />
  <div v-else-if="error && error.data.message === 'error/invalid'">
    INVALID
  </div>
  <div v-else-if="error && error.data.message === 'error/not-found'">
    NOT FOUND
  </div>
  <div v-else>
    ???
  </div>
</template>
