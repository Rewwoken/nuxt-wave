<script setup lang="ts">
  import type { PrismaUser } from '~/types/user.types';

  const user = inject('user') as PrismaUser;
  const followed = ref<boolean | null>(null);

  const { $api } = useNuxtApp();
  const toast = useToast();

  async function onFollow() {
    try {
      await $api('/api/user/actions/follow', {
        query: { id: user.id },
      });

      followed.value = true;

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

  async function onUnFollow() {
    const { $api } = useNuxtApp();

    try {
      await $api('/api/user/actions/un-follow', {
        query: { id: user.id },
      });

      followed.value = false;

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

  const { data } = await useAsyncData('is-followed', () => {
    return $api('/api/user/actions/check-following', {
      method: 'GET',
      query: {
        id: user.id,
      },
    });
  });

  followed.value = data.value;
</script>

<template>
  <Button
    v-if="followed"
    label="Stop following"
    severity="danger"
    size="small"
    pt:root:class="!px-6"
    pt:label:class="!font-bold"
    rounded
    outlined
    @click="onUnFollow"
  />
  <Button
    v-else
    label="Follow"
    severity="contrast"
    size="small"
    pt:root:class="!px-6"
    pt:label:class="!font-bold"
    rounded
    @click="onFollow"
  />
</template>
