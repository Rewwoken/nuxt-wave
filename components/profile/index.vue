<script setup lang="ts">
  import type { PrismaUser } from '~/types/user.types';

  const props = defineProps<{
    user: PrismaUser;
  }>();

  const dtf = Intl.DateTimeFormat('en', {
    dateStyle: 'long',
  });

  provide('user', props.user);
</script>

<template>
  <ProfileBack />
  <UserBanner :src="user.profile.bannerUrl" />
  <div class="relative mt-2 flex items-end px-3">
    <ProfileImage />
    <ProfileActions class="ml-auto" />
  </div>
  <div class="p-3 space-y-3">
    <div class="flex flex-col leading-3">
      <span class="text-lg font-bold">{{ user.profile.name }}</span>
      <span class="text-gray-500">@{{ user.username }}</span>
    </div>
    <p class="text-gray-500">
      {{ user.profile.bio }}
    </p>
    <div class="flex gap-x-3 text-gray-500">
      <div v-if="user.profile.location" class="flex items-center gap-x-1">
        <i class="pi pi-map-marker" />
        <span>{{ user.profile.location }}</span>
      </div>
      <div v-if="user.profile.website" class="flex items-center gap-x-1">
        <i class="pi pi-link" />
        <NuxtLink
          :href="user.profile.website"
          target="_blank"
          class="text-sky-500 hover:underline"
        >
          {{ user.profile.website.split('//')[1] }}
        </NuxtLink>
      </div>
      <div class="flex items-center gap-x-1">
        <i class="pi pi-calendar" />
        <span>Registration: {{ dtf.format(new Date(user.createdAt)) }}</span>
      </div>
    </div>
  </div>
<!--  <ProfileSelection /> -->
</template>
