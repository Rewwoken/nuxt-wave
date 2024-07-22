<template>
  <main
    class="absolute top-1/2 bottom-1/2 flex w-full items-center justify-center gap-x-64"
  >
    <IconNuxt class="size-96" />
    <div class="flex flex-col items-start">
      <h1 class="mb-10 text-6xl font-bold">
        Happening now
      </h1>
      <p class="mb-4 text-4xl font-bold">
        Join today.
      </p>
      <slot />
    </div>
  </main>
  <footer class="absolute bottom-0 w-full py-4 text-center space-x-4">
    <WebsiteInfo />
  </footer>
</template>
