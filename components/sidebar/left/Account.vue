<script setup lang="ts">
  const { currentUser } = useCurrentUser();

  const op = ref();

  function toggle(event: Event) {
    op.value.toggle(event);
  }

  async function logout() {
    await useFetch('/api/auth/logout', { method: 'POST' });

    navigateTo('/auth');
  }
</script>

<template>
  <button
    class="mt-8 flex items-center gap-x-2 rounded-full xl:p-2 xl:pr-3 xl:hover:bg-gray-500/10"
    @click="toggle"
  >
    <UserImage :src="currentUser.profile.imageUrl" class="size-11 min-w-11 min-h-11" />
    <div class="hidden flex-col items-start gap-y-0.5 xl:flex">
      <span class="text-left font-bold leading-4 line-clamp-1">{{ currentUser.profile.name }}</span>
      <span class="text-sm leading-4 text-neutral-500">@{{ currentUser.username }}</span>
    </div>
    <i class="!hidden ml-auto pi pi-ellipsis-h xl:!block" />
  </button>
  <Popover ref="op">
    <button class="w-40 p-1 text-left font-bold" @click="logout">
      Log out @{{ currentUser.username }}
    </button>
  </Popover>
</template>
