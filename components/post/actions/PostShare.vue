<script setup lang="ts">
	const props = defineProps<{
		postId: string;
		author: string;
		count: number;
	}>();

	const repostsCount = ref(props.count);
	const label = computed(() => String(repostsCount.value));
	const showModal = ref(false);

	const { handleRequest } = useHandleRequest();
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
						await handleRequest({
							requestFunc: () => $api('/api/repost', {
								method: 'POST',
								body: {
									postId: props.postId,
								},
							}),
							onSuccess: () => {
								toast.add({
									severity: 'info',
									summary: 'Successfully reposted!',
									detail: 'You can now see it in your profile.',
									life: 3000,
								});

								repostsCount.value++;
							},
							errors: {
								'error/unknown': 'Unexpected error!',
							},
							onError: (message) => {
								toast.add({
									severity: 'error',
									summary: 'Error creating repost!',
									detail: message,
									life: 3000,
								});
							},
						});
					},
				},
				{
					label: 'Reply to post',
					icon: 'pi pi-external-link',
					command: async () => {
						showModal.value = true;
					},
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
		aria-haspopup="menu"
		aria-controls="share-menu"
		aria-label="Open share menu"
		title="Open share menu"
		icon="pi pi-sort-alt"
		severity="secondary"
		size="small"
		:label="label"
		text
		@click="toggleMenu"
	/>
	<Menu
		id="share-menu"
		ref="menu"
		pt:submenu-label:class="hidden"
		:model="items"
		:popup="true"
	/>
	<Dialog
		v-model:visible="showModal"
		pt:root:class="mx-4 w-full max-w-[586px]"
		:header="`Reply to @${author}`"
		:dismissable-mask="true"
		:close-on-escape="true"
		:draggable="false"
		:modal="true"
	>
		<div class="flex gap-x-2">
			<CreationForm
				:parent-id="postId"
				@on-submit="showModal = false"
			/>
		</div>
	</Dialog>
</template>
