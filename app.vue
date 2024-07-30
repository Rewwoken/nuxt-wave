<script setup lang="ts">
  const { theme } = useTheme();

  useHead({
    bodyAttrs: {
      class: theme,
    },
  });

  useSeoMeta({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} / Wave` : 'Wave';
    },
    // TODO: add ogImage
    ogTitle: 'Wave - Dive into the Next Generation of Social Media',
    description: 'A social media app that connects people worldwide, providing new opportunities for communication and information sharing.',
    ogDescription: 'Wave is a revolutionary social media app offering innovative features and an enhanced user experience.',
  });
</script>

<template>
  <div
    class="bg-white min-h-dvh dark:bg-dim dark:text-white"
    :style="{ 'font-family': 'Inter' }"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <Toast />
</template>
