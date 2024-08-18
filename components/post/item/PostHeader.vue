<script setup lang="ts">
	import { format, isThisYear, isToday } from 'date-fns';

	const props = defineProps<{
		name: string;
		username: string;
		time: string;
	}>();

	const formattedTime = isToday(props.time)
		? format(props.time, 'hh:mm a')
		: isThisYear(props.time)
			? format(props.time, 'dd MMM')
			: format(props.time, 'dd MMM Y');
</script>

<template>
	<header class="flex gap-x-1.5 leading-4">
		<span class="font-bold text-color">{{ name }}</span>
		<span class="text-muted-color">@{{ username }}</span>
		<span class="ml-auto text-nowrap text-muted-color">{{ formattedTime }}</span>
	</header>
</template>
