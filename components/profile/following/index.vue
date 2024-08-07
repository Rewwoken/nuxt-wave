<script setup lang="ts">
	const props = defineProps<{
		userId: string;
		username: string;
	}>();

	const { data } = await useAPI('/api/user/actions/check-following', {
		method: 'GET',
		query: {
			id: props.userId,
		},
	});

	const isFollowing = ref(data.value);
	function toggleFollow() {
		isFollowing.value = !isFollowing.value;
	}
</script>

<template>
	<ProfileFollowingUnFollow
		v-if="isFollowing"
		:user-id="userId"
		:username="username"
		@toggle-follow="toggleFollow"
	/>
	<ProfileFollowingFollow
		v-else
		:user-id="userId"
		:username="username"
		@toggle-follow="toggleFollow"
	/>
</template>
