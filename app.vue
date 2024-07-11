<script setup lang="ts">
	const darkMode = ref(true);
</script>

<template>
	<div :class="{ dark: darkMode }">
		<div class="min-h-screen bg-white dark:bg-dim dark:text-white">
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</div>
	</div>
</template>

<style>
* {
	@apply dark:border-slate-300/15;
	font-family: 'Inter';
}
</style>
