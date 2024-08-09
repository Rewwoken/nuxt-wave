<script setup lang="ts">
	const props = defineProps<{
		count: number;
	}>();

	const repostsCount = ref(props.count);
	const label = computed(() => String(repostsCount.value));

	const { $api } = useNuxtApp();
	const toast = useToast();

	const menu = ref();
	const items = ref([
		{
			items: [
				{
					label: 'Create repost',
					icon: 'pi pi-sort-alt',
					command: async () => {
						try {
							await $api('/api/repost', {
								method: 'POST',
							});

							toast.add({
								severity: 'info',
								summary: 'Successfully created repost!',
								detail: 'You can now see it in your profile.',
								life: 3000,
							});
						}
						catch {
							toast.add({
								severity: 'error',
								summary: 'Error creating repost!',
								detail: 'Please, try again later.',
								life: 3000,
							});
						}
					},
				},
				{
					label: 'Quote post',
					icon: 'pi pi-external-link',
				},
			],
		},
	]);

	function toggleMenu(event: Event) {
		menu.value.toggle(event);
	}
</script>

<template>
	<Button
		aria-haspopup="true"
		aria-controls="repost_menu"
		aria-label="Open repost menu"
		title="Open repost menu"
		icon="pi pi-sort-alt"
		severity="secondary"
		size="small"
		:label="label"
		text
		@click="toggleMenu"
	/>
	<Menu
		id="repost_menu"
		ref="menu"
		pt:submenu-label:class="hidden"
		:model="items"
		:popup="true"
	/>
</template>
