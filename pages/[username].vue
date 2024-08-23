<script setup lang="ts">
	const route = useRoute();

	const username = route.params.username as string;
	const selected = route.query.select as string;

	const { data: user } = await useAPI('/api/user', {
		method: 'GET',
		query: { username },
		deep: false, // ! Change it, if you need reactivity
	});

	const title = computed(() => {
		if (user.value) {
			return `${user.value.profile!.name} (@${user.value.username})`;
		}
		return 'Not Found';
	});

	useSeoMeta({ title });
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
