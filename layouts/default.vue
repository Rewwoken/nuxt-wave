<template>
	<div class="grid px-1 gap-x-4 h-full grid-cols-12 mx-auto max-w-[1250px]">
		<aside class="hidden col-span-1 select-none md:flex xl:col-span-2">
			<SidebarLeft />
		</aside>
		<main class="min-h-screen col-span-12 border md:col-span-11 lg:col-span-8 xl:col-span-7">
			<slot />
		</main>
		<aside class="hidden col-span-3 lg:block">
			<SidebarRight />
		</aside>
	</div>
</template>
