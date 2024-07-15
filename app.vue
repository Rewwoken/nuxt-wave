<script setup lang="ts">
  const darkMode = ref(true);

  useHead({
    title: 'NuxtSocial',
    meta: [
      { name: 'description', content: 'A social media website.' },
    ],
  });
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="min-h-screen bg-white dark:bg-dim dark:text-white">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
  <Toast />
</template>

<style>
* {
  @apply dark:border-slate-300/15;
  font-family: 'Inter';
}
</style>
