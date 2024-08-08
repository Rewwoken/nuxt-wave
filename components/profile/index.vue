<script setup lang="ts">
	import type { User } from '~/types/api.types';

	const props = defineProps<{
		user: User;
	}>();

	const currentUser = useCurrentUser();
	const isCurrentUser = computed(() => {
		return props.user.username === currentUser.value.username;
	});
</script>

<template>
	<ProfileHeader :user="user" />
	<!-- Potential improvement: reduce UserBanner size on mobile -->
	<UserBanner
		:src="user.profile!.bannerUrl"
		:height="195"
		:width="586"
	/>
	<div class="flex items-end px-3 mt-2">
		<ProfileImage :source="user.profile!.imageUrl" />
		<!-- If the profile is the current user, display the 'Edit profile' button -->
		<ProfileEdit v-if="isCurrentUser" />
		<div
			v-else
			class="flex items-center ml-auto gap-x-2"
		>
			<!-- TODO: add block -->
			<!-- <ProfileMore
				:user-id="user.id"
				:username="user.username"
			/> -->
			<ProfileFollowing
				:user-id="user.id"
			/>
		</div>
	</div>
	<ProfileInfo :user="user" />
	<!--	<ProfileSelection /> -->
	<ProfilePosts :user-id="user.id" />
</template>
