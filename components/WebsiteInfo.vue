<script setup lang="ts">
	const { theme, toggleTheme } = useTheme();
</script>

<template>
	<NuxtLink
		to="https://github.com/Rewwoken/nuxt-wave"
		target="_blank"
		class="select-none text-sm text-neutral-500 hover:underline"
	>
		Open source
	</NuxtLink>
	<NuxtLink
		to="https://github.com/Rewwoken"
		target="_blank"
		class="select-none text-sm text-neutral-500 hover:underline"
	>
		&copy; 2024 Rewwoken
	</NuxtLink>
	<NuxtLink
		to="https://github.com/Rewwoken/nuxt-wave/blob/main/LICENSE"
		target="_blank"
		class="select-none text-sm text-neutral-500 hover:underline"
	>
		MIT License
	</NuxtLink>
	<button class="select-none text-sm text-neutral-500 hover:underline" @click="toggleTheme">
		<span v-if="theme === 'dark'">Light theme</span>
		<span v-else>Dark theme</span>
	</button>
</template>
