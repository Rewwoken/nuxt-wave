<script setup lang="ts">
  const { currentUser } = useCurrentUser();

  const links = [
    { to: '/home', icon: 'pi-home', text: 'Home' },
    { to: '/explore', icon: 'pi-hashtag', text: 'Explore' },
    { to: '/notifications', icon: 'pi-bell', text: 'Notifications' },
    { to: '/messages', icon: 'pi-envelope', text: 'Messages' },
    { to: '/bookmarks', icon: 'pi-bookmark', text: 'Bookmarks' },
    { to: '/lists', icon: 'pi-file', text: 'Lists' },
    { to: `/${currentUser.username}`, icon: 'pi-user', text: 'Profile' },
    { to: '/more', icon: 'pi-ellipsis-h', text: 'More' },
  ];
</script>

<template>
  <NuxtLink
    to="/home"
    class="rounded-full p-2 transition-colors size-12 hover:bg-gray-500/10"
  >
    <IconNuxt />
  </NuxtLink>
  <nav class="flex flex-col gap-y-4">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="flex items-center gap-x-5 rounded-full p-3 hover:bg-gray-500/10"
    >
      <i :class="`pi ${link.icon}`" style="font-size: 1.5rem" />
      <span class="hidden text-xl xl:inline">{{ link.text }}</span>
    </NuxtLink>
    <Button
      label="Post"
      pt:root:class="!hidden xl:!block"
      pt:label:class="!text-lg !font-semibold !text-white"
      rounded
    />
    <Button
      size="large"
      icon="pi pi-pen-to-square"
      aria-label="Post"
      pt:root:class="xl:!hidden !size-12"
      pt:icon:class="!text-white"
      rounded
    />
  </nav>
</template>
