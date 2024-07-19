<script setup lang="ts">
  const { fetchCurrentUser } = useCurrentUser();

  await callOnce(fetchCurrentUser);
</script>

<!-- TODO: add bottom navigation on mobile -->
<template>
  <NuxtLoadingIndicator />
  <div class="grid px-1 gap-x-4 grid-cols-10 mx-auto max-w-[1200px]">
    <aside class="hidden col-span-1 select-none md:flex xl:col-span-2">
      <SidebarLeft />
    </aside>
    <main
      class="col-span-10 border-gray-200 border-x main md:col-span-9 lg:col-span-6 xl:col-span-5 dark:border-gray-800"
    >
      <slot />
    </main>
    <aside class="hidden col-span-3 lg:block">
      <SidebarRight />
    </aside>
  </div>
</template>
