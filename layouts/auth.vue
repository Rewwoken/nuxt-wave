<template>
	<main class="absolute flex items-center justify-center w-full gap-x-64 top-1/2 bottom-1/2">
		<LogoNuxt class="size-96" />
		<div class="flex flex-col items-start">
			<h1 class="mb-10 text-6xl font-bold">
				Happening now
			</h1>
			<p class="mb-4 text-4xl font-bold">
				Join today.
			</p>
			<slot />
		</div>
	</main>
	<footer class="absolute bottom-0 w-full py-4 space-x-4 text-center">
		<NuxtLink
			to="https://github.com/Rewwoken/nuxt-social"
			target="_blank"
			class="text-sm text-neutral-500 hover:underline"
		>
			Open source
		</NuxtLink>
		<NuxtLink
			to="https://github.com/Rewwoken/nuxt-social"
			target="_blank"
			class="text-sm text-neutral-500 hover:underline"
		>
			&copy; Rewwoken
		</NuxtLink>
	</footer>
</template>
