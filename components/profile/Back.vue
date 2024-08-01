<script setup lang="ts">
  import type { User } from '~/types/api.types';

  const router = useRouter();

  const user = inject('user') as User;
  const { data: count } = useAPI('/api/post/count', {
    method: 'GET',
    query: {
      userId: user.id,
    },
  });
</script>

<template>
  <div class="flex items-center p-1 gap-x-6">
    <Button
      icon="pi pi-arrow-left"
      severity="contrast"
      pt:root:class="!border-0"
      outlined
      rounded
      @click="router.back"
    />
    <div class="flex flex-col leading-4">
      <span class="text-xl font-bold">{{ user.profile.name }}</span>
      <span class="text-xs text-gray-500">{{ count }} posts</span>
    </div>
  </div>
</template>
