<script setup lang="ts">
	import type { NuxtError } from '#app';

	const props = defineProps<{
		error: NuxtError;
	}>();
	// import.meta.dev && console.log(props.error);

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
		<h1 class="mb-6">
			<span class="text-4xl">
				{{ error.statusCode }}
			</span>
			<span
				v-if="error.statusMessage"
				class="text-4xl"
			>
				- {{ error.statusMessage }}
			</span>
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
