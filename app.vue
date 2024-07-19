<script setup lang="ts">
  const { theme } = useTheme();

  useHead({
    title: 'NuxtSocial',
    meta: [{ name: 'description', content: 'A social media website.' }],
    bodyAttrs: {
      class: theme,
    },
  });
</script>

<template>
  <div
    class="min-h-screen bg-white dark:bg-dim dark:text-white"
    :style="{ 'font-family': 'Inter' }"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <Toast />
</template>
