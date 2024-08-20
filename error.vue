<script setup lang="ts">
	import type { NuxtError } from '#app';

	const props = defineProps<{
		error: NuxtError;
	}>();

	const label = props.error.statusCode === 401
		? 'Go to authentication'
		: 'Go home';

	async function onNavigate() {
		if (props.error.statusCode === 401) {
			return void await logout();
		}

		await navigateTo('/home');
	}

	useHead({
		bodyAttrs: {
			class: useTheme().theme,
		},
	});

	const title = props.error.statusMessage
		? `${props.error.statusMessage} / Wave`
		: 'Error / Wave';

	useSeoMeta({ title });
</script>

<template>
	<main class="flex h-dvh flex-col items-center justify-center bg-color text-color">
		<h1 class="mb-6 text-4xl">
			{{ error.statusCode }} - {{ error.statusMessage }}
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
