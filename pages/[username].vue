<script setup lang="ts">
	const route = useRoute();

	const username = route.params.username as string;
	const selected = route.query.select as string;

	const { data: user } = await useAPI(`/api/user/${username}`, {
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
		<ProfileTabs
			:selected="selected"
			:username="user.username"
			:user-id="user.id"
		/>
	</template>
</template>
