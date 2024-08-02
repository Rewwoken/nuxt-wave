<script setup lang="ts">
	import type { User } from '~/types/api.types';

	const user = inject('user') as User;

	const menu = ref();
	function toggle(event: Event) {
		menu.value.toggle(event);
	}

	const toast = useToast();
	const route = useRoute();
	const items = ref([
		{
			label: 'Copy profile link',
			icon: 'pi pi-link',
			command: async () => {
				const config = useRuntimeConfig();
				await navigator.clipboard.writeText(`${config.public.baseUrl}/${route.fullPath}`);

				toast.add({
					severity: 'success',
					summary: 'Success',
					detail: 'File created',
					life: 3000,
				});
			},
		},
		{
			label: `Block @${user.username}`,
			icon: 'pi pi-ban',
			command: async () => {
				const { $api } = useNuxtApp();

				try {
					await $api('/api/user/actions/block', {
						method: 'GET',
						query: { id: user.id },
					});
				}
				catch {
					toast.add({
						severity: 'error',
						summary: 'Error occurred during user block!',
						detail: 'Please, try again later.',
						life: 3000,
					});
				}

				toast.add({
					severity: 'success',
					summary: 'Success',
					detail: 'File created',
					life: 3000,
				});
			},
		},
	]);
</script>

<template>
	<div class="flex justify-center card">
		<Button
			type="button"
			icon="pi pi-ellipsis-h"
			severity="contrast"
			outlined
			rounded
			text
			@click="toggle"
		/>
		<Menu
			ref="menu"
			:model="items"
			:popup="true"
			pt:submenu-label:class="!hidden"
		/>
	</div>
</template>
