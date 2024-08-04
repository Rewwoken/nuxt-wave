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
			<UserImage :src="item.image" :px="44" />
			<div class="flex flex-col gap-y-0.5">
				<span class="font-bold leading-4">{{ item.name }}</span>
				<span class="text-sm leading-4 text-neutral-500">{{ item.handle }}</span>
			</div>
			<Button
				label="Follow"
				size="small"
				severity="contrast"
				pt:root:class="!ml-auto !px-4"
				pt:label:class="!font-semibold"
				rounded
			/>
		</li>
	</ul>
</template>
