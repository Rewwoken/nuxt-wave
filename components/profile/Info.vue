<script setup lang="ts">
	import { format } from 'date-fns';
	import type { User } from '~/types/api.types';

	const props = defineProps<{
		user: User;
	}>();

	const registrationDate = format(props.user.createdAt, 'MMMM, yyyy');
</script>

<template>
	<div class="space-y-3 p-3">
		<div class="flex flex-col leading-3">
			<span class="text-lg font-bold">{{ user.profile!.name }}</span>
			<span class="text-muted-color">@{{ user.username }}</span>
		</div>
		<p class="text-muted-color">
			{{ user.profile!.bio }}
		</p>
		<div class="flex flex-wrap gap-x-3 text-muted-color">
			<div
				v-if="user.profile!.location"
				class="flex items-center gap-x-1"
			>
				<i class="pi pi-map-marker" />
				<span>{{ user.profile!.location }}</span>
			</div>
			<div
				v-if="user.profile!.website"
				class="flex items-center gap-x-1"
			>
				<i class="pi pi-link" />
				<NuxtLink
					target="_blank"
					class="text-primary-500 hover:underline"
					:href="user.profile!.website"
				>
					{{ user.profile!.website.split('//')[1] }}
				</NuxtLink>
			</div>
			<div class="flex items-center gap-x-1">
				<i class="pi pi-calendar" />
				<span>Registration: {{ registrationDate }}</span>
			</div>
		</div>
	</div>
</template>
