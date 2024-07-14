<script setup lang="ts">
	const { data: user, status } = useFetch('/api/me', {
		method: 'GET',
	});
</script>

<template>
	<div
		v-if="status === 'success' && user"
		class="flex flex-col items-end w-full xl:items-stretch"
	>
		<SidebarLeftNav :username="user.username" />
		<SidebarLeftAccount :user="user" />
	</div>
</template>
