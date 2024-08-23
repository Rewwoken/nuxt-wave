<script setup lang="ts">
	import type { NuxtError } from '#app';

	const props = defineProps<{
		error: NuxtError;
	}>();

	const label = props.error.statusCode === 401
		? 'Go to authentication'
		: 'Go home';

	const { logout } = useLogout();
	function onNavigate() {
		if (props.error.statusCode === 401) {
			return logout();
		}

		navigateTo('/home');
	}

	const { theme } = useTheme();
	useHead({
		bodyAttrs: { class: theme },
	});

	const title = props.error.statusMessage
		? `${props.error.statusMessage} / Wave`
		: 'Error / Wave';

	useSeoMeta({ title });
</script>

<template>
	<pre>{{ props.error }}</pre>
	<main class="flex h-dvh flex-col items-center justify-center bg-color text-color">
		<h1 class="mb-6 text-4xl">
			{{ error.statusCode }} - {{ error.statusMessage || 'Unknown' }}
		</h1>
		<Button
			icon="pi pi-link"
			size="large"
			:label="label"
			text
			@click="onNavigate"
		/>
	</main>
	<footer class="fixed bottom-0 w-full space-x-4 py-4 text-center">
		<WebsiteInfo />
	</footer>
</template>
