<script setup lang="ts">
	import { format } from 'date-fns';
	import type { User } from '~/types/api.types';

	const props = defineProps<{
		user: NonNullable<User>;
	}>();

	const registrationDate = format(props.user.createdAt, 'MMMM, yyyy');

	const route = useRoute();
	const currentUser = useCurrentUser();
	const isCurrentUser = route.path === `/${currentUser.value.username}`;

	provide('user', props.user);
</script>

<template>
	<ProfileHeader />
	<!-- Potential improvement: reduce UserBanner size on mobile -->
	<UserBanner :src="user.profile.bannerUrl" :height="195" :width="586" />
	<div class="flex items-end px-3 mt-2">
		<ProfileImage />
		<ProfileEdit v-if="isCurrentUser" />
		<div v-else class="flex items-center ml-auto gap-x-2">
			<ProfileMore />
			<ProfileFollowing />
		</div>
	</div>
	<div class="p-3 space-y-3">
		<div class="flex flex-col leading-3">
			<span class="text-lg font-bold">{{ user.profile.name }}</span>
			<span class="text-gray-500">@{{ user.username }}</span>
		</div>
		<p class="text-gray-500">
			{{ user.profile.bio }}
		</p>
		<div class="flex flex-wrap text-gray-500 gap-x-3">
			<div v-if="user.profile.location" class="flex items-center gap-x-1">
				<i class="pi pi-map-marker" />
				<span>{{ user.profile.location }}</span>
			</div>
			<div v-if="user.profile.website" class="flex items-center gap-x-1">
				<i class="pi pi-link" />
				<NuxtLink
					:href="user.profile.website"
					target="_blank"
					class="text-primary-500 hover:underline"
				>
					{{ user.profile.website.split('//')[1] }}
				</NuxtLink>
			</div>
			<div class="flex items-center gap-x-1">
				<i class="pi pi-calendar" />
				<span>Registration: {{ registrationDate }}</span>
			</div>
		</div>
	</div>
	<!--	<ProfileSelection /> -->
	<!-- Posts -->
</template>
