<script setup lang="ts">
	const route = useRoute();

	const querySelect = route.query.select as string;
	const selectOptions = ['all', 'posts', 'reposts', 'likes'];

	const select = selectOptions.includes(querySelect) ? querySelect : 'all';

	const username = route.params.username as string;
	const { data: user, error } = await useAPI(`/api/user/${username}`, {
		method: 'GET',
		deep: false, // ! Change it, if you need reactivity
	});

	const title = `${user.value!.profile!.name} (@${user.value?.username})`;
	useSeoMeta({
		title: user.value ? title : 'Not Found',
	});
</script>

<template>
	<template v-if="user">
		<Profile :user="user" />
		<ProfileSelection
			:user-id="user.id"
			:initial-value="select || 'all'"
		/>
	</template>
	<div v-else-if="error && error.data.message === 'error/invalid'">
		INVALID
	</div>
	<div v-else>
		NOT FOUND
	</div>
</template>
