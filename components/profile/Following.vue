<script setup lang="ts">
	const props = defineProps<{
		userId: string;
	}>();

	const { data } = await useAPI(`/api/user/${props.userId}/follow`, {
		method: 'GET',
	});
	const isFollowing = ref(data.value);

	const { $api } = useNuxtApp();

	async function toggleFollow() {
		await $api(`/api/user/${props.userId}/follow`, {
			method: isFollowing.value ? 'DELETE' : 'POST',
		});

		isFollowing.value = !isFollowing.value;
	}
</script>

<template>
	<Button
		v-if="isFollowing"
		label="Stop following"
		severity="danger"
		size="small"
		pt:root:class="!px-6"
		pt:label:class="!font-bold"
		rounded
		outlined
		@click="toggleFollow"
	/>
	<Button
		v-else
		label="Follow"
		severity="contrast"
		size="small"
		pt:root:class="!px-6"
		pt:label:class="!font-bold"
		rounded
		@click="toggleFollow"
	/>
</template>
