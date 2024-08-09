<template>
	<main class="absolute inset-y-1/2 flex w-full items-center justify-center gap-x-64">
		<CommonIconNuxt class="hidden size-96 xl:block" />
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
	<footer class="fixed bottom-0 w-full space-x-4 px-2 py-4 text-center">
		<CommonWebsiteInfo />
	</footer>
</template>
