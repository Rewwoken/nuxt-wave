<script setup lang="ts">
  import type { PrismaUser } from '~/types/user.types';

  const router = useRouter();

  const user = inject('user') as PrismaUser;
</script>

<!-- TODO: add currentUser name & posts count -->
<template>
  <div class="flex items-center gap-x-6 py-1">
    <Button
      icon="pi pi-arrow-left"
      severity="contrast"
      pt:root:class="!border-0 !rounded-none"
      outlined
      @click="router.back"
    />
    <div class="flex flex-col leading-4">
      <span class="font-bold">{{ user.profile.name }}</span>
      <span class="text-sm text-gray-500">@{{ user.username }}</span>
    </div>
  </div>
</template>
