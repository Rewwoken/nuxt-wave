<script setup lang="ts">
	import type { User } from '~/types/api.types';

	const route = useRoute();
	const username = route.params.username as string;

	const currentUser = useCurrentUser();

	async function getUser(username: string) {
		if (username === currentUser.value!.username) {
			return { user: currentUser, error: null };
		}

		const { data: user, error } = await useAPI<User>(`/api/user/${username}`, {
			method: 'GET',
		});
		return { user, error };
	}

	const { user, error } = await getUser(username);
	useSeoMeta({
		title: user ? `${user.value!.profile.name} (@${user.value!.username})` : 'Not Found',
	});
</script>

<template>
	<!-- @vue-expect-error -->
	<Profile v-if="user" :user="user" />
	<div v-else-if="error && error.data.message === 'error/invalid'">
		INVALID
	</div>
	<div v-else>
		NOT FOUND
	</div>
</template>
