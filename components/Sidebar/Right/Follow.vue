<script setup lang="ts">
	const items = reactive([
		{
			name: 'tokito',
			handle: '@to.toki',
			image: 'https://picsum.photos/200/200',
		},
		{
			name: 'kaleb',
			handle: '@ezkaleb',
			image: 'https://picsum.photos/200/200',
		},
		{
			name: 'teanna',
			handle: '@tenn',
			image: 'https://picsum.photos/200/200',
		},
	]);
</script>

<template>
	<section class="border rounded-2xl">
		<h2 class="px-3 py-2 text-2xl font-bold border-b">
			Who to follow
		</h2>
		<li v-for="item in items" :key="item.handle" class="flex items-center p-2 py-3 border-b gap-x-2">
			<img
				:src="item.image"
				:alt="item.handle"
				class="rounded-full size-10"
			>
			<div class="flex flex-col">
				<span class="font-bold leading-6">{{ item.name }}</span>
				<span class="text-sm leading-4 text-neutral-400">{{ item.handle }}</span>
			</div>
			<button class="px-4 py-1.5 font-semibold ml-auto text-sm text-white rounded-full dark:text-black bg-dim dark:bg-white">
				Follow
			</button>
		</li>
		<button class="w-full p-3 text-sm text-left text-sky-600 hover:underline">
			Show more
		</button>
	</section>
</template>
