<script setup lang="ts">
	const { authUser } = useAuth();

	const op = ref();

	function toggle(event: Event) {
		op.value.toggle(event);
	}

	const { logout } = useLogout();
</script>

<template>
	<button
		type="button"
		class="mt-16 flex items-center gap-x-2 rounded-full transition-colors xl:p-2 xl:pr-4 xl:hover:bg-emphasis"
		aria-label="Open logout popover"
		@click="toggle"
	>
		<UserImage
			:src="authUser .profile!.imageUrl"
			:px="44"
		/>
		<div class="hidden flex-col items-start justify-center overflow-hidden xl:flex">
			<span class="text-ellipsis text-nowrap font-bold">{{ authUser .profile!.name }}</span>
			<span class="relative bottom-1 text-muted-color">@{{ authUser .username }}</span>
		</div>
		<i class="pi pi-ellipsis-h ml-auto !hidden xl:!inline" />
	</button>
	<Popover ref="op">
		<button
			class="w-48 text-left font-bold"
			@click="logout"
		>
			Log out @{{ authUser .username }}
		</button>
	</Popover>
</template>
