<script setup lang="ts">
  const { user } = defineProps<{
    user: Record<string, any>;
  }>();

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
    class="flex items-center mt-8 rounded-full cursor-pointer xl:p-2 gap-x-2 xl:hover:bg-gray-500/10"
    @click="toggle"
  >
    <UserAvatar :src="user.image" />
    <div class="xl:flex flex-col gap-y-0.5 hidden items-start">
      <span class="font-bold leading-4">{{ user.name }}</span>
      <span class="text-sm leading-4 text-neutral-500">{{ user.username }}</span>
    </div>
  </button>
  <Popover ref="op">
    <button
      class="w-40 p-1 font-bold text-left"
      @click="logout"
    >
      Log out {{ user?.username }}
    </button>
  </Popover>
</template>
