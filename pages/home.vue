<script setup lang="ts">
	useSeoMeta({
		title: 'Home',
	});
</script>

<template>
	<div class="fixed bottom-20 flex w-full max-w-[586px] justify-end px-4 md:hidden">
		<NewPostModal />
	</div>
	<section class="hidden w-full gap-x-4 p-3 md:flex">
		<NewPostForm />
	</section>
</template>
