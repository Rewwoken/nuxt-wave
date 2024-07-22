<script setup lang="ts">
  defineProps<{
    title: string;
    footerLink: string;
  }>();
</script>

<template>
  <article
    class="rounded-2xl border border-gray-200 px-4 py-3 dark:border-gray-800"
  >
    <h2 class="mb-4 text-xl font-bold">
      {{ title }}
    </h2>
    <ul class="flex flex-col gap-y-6">
      <slot />
    </ul>
    <NuxtLink
      :to="footerLink"
      class="mt-4 inline-block w-full text-sm font-semibold text-sky-500 hover:underline"
    >
      Show more
    </NuxtLink>
  </article>
</template>
