<script setup lang="ts">
  const props = defineProps<{
    username: string;
  }>();

  const links = [
    { to: '/home', icon: 'pi-home', text: 'Home' },
    { to: '/explore', icon: 'pi-hashtag', text: 'Explore' },
    { to: '/notifications', icon: 'pi-bell', text: 'Notifications' },
    { to: '/messages', icon: 'pi-envelope', text: 'Messages' },
    { to: '/bookmarks', icon: 'pi-bookmark', text: 'Bookmarks' },
    { to: '/lists', icon: 'pi-file', text: 'Lists' },
    { to: `/${props.username}`, icon: 'pi-user', text: 'Profile' }, // Hydration completed but contains mismatches.
    { to: '/more', icon: 'pi-ellipsis-h', text: 'More' },
  ].filter(Boolean);
</script>

<template>
  <NuxtLink to="/home" class="p-2 transition-colors rounded-full size-12 hover:bg-gray-500/10">
    <IconNuxt />
  </NuxtLink>
  <nav class="flex flex-col gap-y-4">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="flex items-center p-3 rounded-full gap-x-5 hover:bg-gray-500/10"
    >
      <i :class="`pi ${link.icon}`" style="font-size: 1.5rem" />
      <span class="hidden text-xl xl:inline">{{ link.text }}</span>
    </NuxtLink>
    <Button
      label="Post"
      class="!hidden xl:!block !text-white text-lg"
      rounded
    />
    <Button
      size="large"
      icon="pi pi-pen-to-square"
      aria-label="Post"
      class="xl:!hidden !size-12"
    />
  </nav>
</template>
