<script setup lang="ts">
  import type { PrismaUser } from '~/types/user.types';

  const emit = defineEmits<{
    (e: 'toggleFollow'): void;
  }>();
  const user = inject('user') as PrismaUser;

  const toast = useToast();
  const { $api } = useNuxtApp();
  async function onUnFollow() {
    try {
      await $api('/api/user/actions/un-follow', {
        query: { id: user.id },
      });

      emit('toggleFollow');

      toast.add({
        severity: 'info',
        summary: 'Unfollowing process successful.',
        detail: `You stopped following @${user.username}.`,
        life: 3000,
      });
    }
    catch {
      toast.add({
        severity: 'error',
        summary: 'Error unfollowing user!',
        detail: 'Please, try again later.',
        life: 3000,
      });
    }
  }
</script>

<template>
  <Button
    label="Stop following"
    severity="danger"
    size="small"
    pt:root:class="!px-6"
    pt:label:class="!font-bold"
    rounded
    outlined
    @click="onUnFollow"
  />
</template>
