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
    class="flex items-center mt-8 rounded-full xl:p-2 xl:pr-3 gap-x-2 xl:hover:bg-gray-500/10"
    @click="toggle"
  >
    <UserImage :src="currentUser.image" class="size-11" />
    <div class="xl:flex flex-col gap-y-0.5 hidden items-start">
      <span class="font-bold leading-4">{{ currentUser.name }}</span>
      <span class="text-sm leading-4 text-neutral-500">@{{ currentUser.username }}</span>
    </div>
    <i class="!hidden ml-auto pi pi-ellipsis-h xl:!block" />
  </button>
  <Popover ref="op">
    <button class="w-40 p-1 font-bold text-left" @click="logout">
      Log out @{{ currentUser.username }}
    </button>
  </Popover>
</template>
