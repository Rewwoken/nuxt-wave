<script setup lang="ts">
  const { fetchCurrentUser } = useCurrentUser();

  await callOnce(fetchCurrentUser);
</script>

<!-- TODO: add bottom navigation on mobile -->
<template>
  <NuxtLoadingIndicator />
  <div class="mx-auto grid grid-cols-10 gap-x-4 px-1 max-w-[1200px]">
    <aside class="col-span-1 hidden select-none md:flex xl:col-span-2">
      <SidebarLeft />
    </aside>
    <main
      class="col-span-10 border-x border-gray-200 main dark:border-gray-800 md:col-span-9 lg:col-span-6 xl:col-span-5"
    >
      <slot />
    </main>
    <aside class="col-span-3 hidden lg:block">
      <SidebarRight />
    </aside>
  </div>
</template>
