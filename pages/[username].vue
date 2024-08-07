<script setup lang="ts">
	const currentUser = useCurrentUser();

	async function getUser(username: string) {
		if (username === currentUser.value.username) {
			return { data: currentUser, error: null };
		}

		return useAPI(`/api/user/${username}`, {
			method: 'GET',
			deep: false, // ! Change it, if you need reactivity
		});
	}

	const route = useRoute();
	const username = route.params.username as string;
	const { data: user, error } = await getUser(username);

	const title = `${user.value!.profile!.name} (@${user.value?.username})`;
	useSeoMeta({
		title: user.value ? title : 'Not Found',
	});
</script>

<template>
	<Profile v-if="user" :user="user" />
	<div v-else-if="error && error.data.message === 'error/invalid'">
		INVALID
	</div>
	<div v-else>
		NOT FOUND
	</div>
</template>
