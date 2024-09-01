<script setup lang="ts">
	const props = defineProps<{
		username: string;
	}>();

	const route = useRoute();

	const isProfileRoute = computed(() => {
		const usernameRoute = `/${props.username}`;
		return route.path.startsWith(usernameRoute);
	});
</script>

<template>
	<NuxtLink
		class="flex items-center gap-x-5 rounded-full p-3 transition-colors hover:bg-emphasis"
		:class="{ 'font-bold': isProfileRoute }"
		:aria-label="`Navigate to ${username}`"
		:to="`/${username}`"
	>
		<i class="pi pi-user !text-3xl" />
		<span class="hidden text-xl xl:inline">Profile</span>
	</NuxtLink>
</template>
