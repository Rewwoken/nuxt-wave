<template>
	<NuxtLayout name="default">
		<div class="fixed bottom-20 flex w-full max-w-[586px] justify-end px-4 md:hidden">
			<NewPostModal />
		</div>
		<slot />
	</NuxtLayout>
</template>
