<script setup lang="ts">
	const { theme, toggleTheme } = useTheme();
</script>

<template>
	<NuxtLink
		to="https://github.com/Rewwoken/nuxt-wave"
		target="_blank"
		class="text-sm hover:underline text-muted-color"
	>
		Open source
	</NuxtLink>
	<NuxtLink
		to="https://github.com/Rewwoken"
		target="_blank"
		class="text-sm text-muted-color hover:underline"
	>
		&copy; 2024 Rewwoken
	</NuxtLink>
	<NuxtLink
		to="https://github.com/Rewwoken/nuxt-wave/blob/main/LICENSE"
		target="_blank"
		class="text-sm text-muted-color hover:underline"
	>
		MIT License
	</NuxtLink>
	<button class="text-sm text-muted-color hover:underline" @click="toggleTheme">
		<span v-if="theme === 'dark'">Light theme</span>
		<span v-else>Dark theme</span>
	</button>
</template>
