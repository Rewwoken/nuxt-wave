<script setup lang="ts">
  import type { PrismaUser } from '~/types/user.types';

  const user = inject('user') as PrismaUser;

  const { $api } = useNuxtApp();
  const { data } = await useAsyncData('is-following', () => {
    return $api('/api/user/actions/check-following', {
      method: 'GET',
      query: {
        id: user.id,
      },
    });
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
