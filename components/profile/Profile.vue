<script setup lang="ts">
	import type { User } from '~/types/api.types';

	const props = defineProps<{
		user: User;
	}>();

	const { authUser } = useAuth();
	const isCurrentUser = computed(() => {
		return props.user.username === authUser.value.username;
	});
</script>

<template>
	<header class="sticky top-0 z-10 flex items-center gap-x-6 bg-bg-color p-1">
		<ProfileHeaderReturn />
		<ProfileHeaderUser
			:user-id="user.id"
			:name="user.profile!.name"
		/>
		<ProfileHeaderLogout />
	</header>
	<UserBanner
		:src="user.profile!.bannerUrl"
		:height="195"
		:width="586"
	/>
	<div class="mt-2 flex items-end px-3">
		<ProfileImage :source="user.profile!.imageUrl" />
		<ProfileEditModal v-if="isCurrentUser" />
		<div
			v-else
			class="ml-auto flex items-center gap-x-2"
		>
			<!-- TODO: add block etc. -->
			<!-- <ActionsMore
				:user-id="user.id"
				:username="user.username"
			/> -->
			<ProfileFollow :user-id="user.id" />
		</div>
	</div>
	<ProfileInfo :user="user" />
</template>
