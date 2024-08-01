<script setup lang="ts">
  import type { User } from '~/types/api.types';

  const user = inject('user') as User;

  const { data } = await useAPI('/api/user/actions/check-following', {
    method: 'GET',
    query: {
      id: user.id,
    },
  });

  const isFollowing = ref(data.value);
  function toggleFollow() {
    isFollowing.value = !isFollowing.value;
  }
</script>

<template>
  <ProfileFollowingUnFollow v-if="isFollowing" @toggle-follow="toggleFollow" />
  <ProfileFollowingFollow v-else @toggle-follow="toggleFollow" />
</template>
