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
	<!-- Potential improvement: reduce CommonUserBanner size on mobile -->
	<CommonUserBanner
		:src="user.profile!.bannerUrl"
		:height="195"
		:width="586"
	/>
	<div class="mt-2 flex items-end px-3">
		<ProfileImage :source="user.profile!.imageUrl" />
		<!-- If the profile is the current user, display the 'Edit profile' button -->
		<ProfileEditModal v-if="isCurrentUser" />
		<div
			v-else
			class="ml-auto flex items-center gap-x-2"
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
