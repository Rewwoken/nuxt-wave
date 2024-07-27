<script setup lang="ts">
  import type { PrismaUser } from '~/types/user.types';

  const emit = defineEmits<{
    (e: 'toggleFollow'): void;
  }>();
  const user = inject('user') as PrismaUser;

  const toast = useToast();
  const { $api } = useNuxtApp();
  async function onFollow() {
    try {
      await $api('/api/user/actions/follow', {
        query: { id: user.id },
      });

      emit('toggleFollow');

      toast.add({
        severity: 'info',
        summary: 'Following process successful.',
        detail: `You are now following @${user.username}.`,
        life: 3000,
      });
    }
    catch {
      toast.add({
        severity: 'error',
        summary: 'Error following user!',
        detail: 'Please, try again later.',
        life: 3000,
      });
    }
  }
</script>

<template>
  <Button
    label="Follow"
    severity="contrast"
    size="small"
    pt:root:class="!px-6"
    pt:label:class="!font-bold"
    rounded
    @click="onFollow"
  />
</template>
