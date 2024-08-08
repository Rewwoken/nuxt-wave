<script setup lang="ts">
	const items = ref([
		{
			name: 'tokito',
			handle: '@to.toki',
			image: null,
		},
		{
			name: 'kaleb',
			handle: '@ezkaleb',
			image: null,
		},
		{
			name: 'teanna',
			handle: '@tenn',
			image: null,
		},
	]);
</script>

<template>
	<ul class="flex flex-col gap-y-6">
		<li
			v-for="item in items"
			:key="item.handle"
			class="flex items-center gap-x-2"
		>
			<UserImage
				:src="item.image"
				:px="44"
			/>
			<div class="flex flex-col">
				<span class="font-bold">{{ item.name }}</span>
				<span class="text-sm text-neutral-500 relative bottom-1">{{ item.handle }}</span>
			</div>
			<Button
				label="Follow"
				size="small"
				severity="contrast"
				pt:root:class="px-4 ml-auto"
				pt:label:class="font-semibold"
				rounded
			/>
		</li>
	</ul>
</template>
