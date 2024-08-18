<script setup lang="ts">
	const { theme, toggleTheme } = useTheme();
</script>

<template>
	<NuxtLink
		to="https://github.com/Rewwoken/wave"
		target="_blank"
		class="text-sm transition-colors text-muted-color hover:text-muted-color-emphasis"
	>
		Open source
	</NuxtLink>
	<NuxtLink
		to="https://github.com/Rewwoken"
		target="_blank"
		class="text-sm transition-colors text-muted-color hover:text-muted-color-emphasis"
	>
		&copy; 2024 Rewwoken
	</NuxtLink>
	<NuxtLink
		to="https://github.com/Rewwoken/wave/blob/main/LICENSE"
		target="_blank"
		class="text-sm transition-colors text-muted-color hover:text-muted-color-emphasis"
	>
		MIT License
	</NuxtLink>
	<button
		class="text-sm transition-colors text-muted-color hover:text-muted-color-emphasis"
		@click="toggleTheme"
	>
		<span v-if="theme === 'dark'">Light theme</span>
		<span v-else>Dark theme</span>
	</button>
</template>
