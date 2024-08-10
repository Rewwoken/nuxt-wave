<script setup lang="ts">
	const currentUser = useCurrentUser();

	const op = ref();

	function toggle(event: Event) {
		op.value.toggle(event);
	}

	async function onLogout() {
		await logout();
	}
</script>

<template>
	<button
		type="button"
		class="mt-16 flex items-center gap-x-2 rounded-full transition-colors xl:p-2 xl:pr-4 xl:hover:bg-emphasis"
		aria-label="Open logout popover"
		@click="toggle"
	>
		<CommonUserImage
			:src="currentUser.profile!.imageUrl"
			:px="44"
		/>
		<div class="hidden flex-col items-start justify-center overflow-hidden xl:flex">
			<span class="text-ellipsis text-nowrap font-bold">{{ currentUser.profile!.name }}</span>
			<span class="relative bottom-1 text-muted-color">@{{ currentUser.username }}</span>
		</div>
		<i class="pi pi-ellipsis-h ml-auto !hidden xl:!inline" />
	</button>
	<Popover ref="op">
		<button
			class="w-48 text-left font-bold"
			@click="onLogout"
		>
			Log out @{{ currentUser.username }}
		</button>
	</Popover>
</template>
