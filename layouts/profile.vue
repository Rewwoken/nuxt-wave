<script setup lang="ts">
	const route = useRouter().currentRoute.value;
	const username = route.params.username as string;

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
	<NuxtLayout name="default">
		<template v-if="user">
			<Profile :user="user" />
			<ProfileTabs :username="user.username" />
			<NuxtPage :user-id="user.id" />
		</template>
	</NuxtLayout>
</template>
