<template>
	<main class="absolute flex items-center justify-center w-full top-1/2 bottom-1/2 gap-x-64">
		<IconNuxt class="hidden size-96 xl:block" />
		<div class="flex flex-col items-center xl:items-start">
			<h1 class="mb-3 text-5xl font-bold md:mb-10 md:text-6xl">
				Happening now
			</h1>
			<p class="mb-4 text-4xl font-bold">
				Join today.
			</p>
			<slot />
		</div>
	</main>
	<footer class="fixed bottom-0 w-full px-2 py-4 space-x-4 text-center">
		<WebsiteInfo />
	</footer>
</template>
