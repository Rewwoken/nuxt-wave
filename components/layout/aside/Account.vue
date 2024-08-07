<script setup lang="ts">
	const currentUser = useCurrentUser();

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
		<UserImage :src="currentUser.profile!.imageUrl" :px="44" />
		<div class="hidden flex-col items-start xl:flex justify-center">
			<span class="font-bold line-clamp-1">{{ currentUser.profile!.name }}</span>
			<span class="text-muted-color relative bottom-1">@{{ currentUser.username }}</span>
		</div>
		<i class="!hidden ml-auto pi pi-ellipsis-h xl:!inline" />
	</button>
	<Popover ref="op">
		<button class="w-48 font-bold text-left" @click="logout">
			Log out @{{ currentUser.username }}
		</button>
	</Popover>
</template>
