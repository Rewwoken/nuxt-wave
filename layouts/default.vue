<!-- TODO: add bottom navigation on mobile -->
<template>
  <div class="grid px-1 gap-x-4 h-full grid-cols-10 mx-auto max-w-[1200px]">
    <aside class="hidden col-span-1 select-none md:flex xl:col-span-2">
      <SidebarLeft />
    </aside>
    <main class="min-h-screen col-span-10 border main md:col-span-9 lg:col-span-6 xl:col-span-5">
      <slot />
    </main>
    <aside class="hidden col-span-3 lg:block">
      <SidebarRight />
    </aside>
  </div>
</template>

<style scoped>
.main > * {
  @apply border-b;
}
</style>
