<script setup lang="ts">
	const { currentUser, logout } = useCurrentUser();

	const op = ref();

	function toggle(event: Event) {
		op.value.toggle(event);
	}
</script>

<template>
	<button
		type="button"
		class="flex items-center mt-16 rounded-full gap-x-2 xl:p-2 xl:pr-3 xl:hover:bg-gray-500/10"
		aria-label="Open logout popover"
		@click="toggle"
	>
		<UserImage :src="currentUser.profile.imageUrl" :px="44" />
		<div class="hidden flex-col items-start gap-y-0.5 xl:flex">
			<span class="font-bold leading-4 text-left line-clamp-1">{{ currentUser.profile.name }}</span>
			<span class="text-sm leading-4 text-neutral-500">@{{ currentUser.username }}</span>
		</div>
		<i class="!hidden ml-auto pi pi-ellipsis-h xl:!block" />
	</button>
	<Popover ref="op">
		<button class="w-40 p-1 font-bold text-left" @click="logout">
			Log out @{{ currentUser.username }}
		</button>
	</Popover>
</template>
