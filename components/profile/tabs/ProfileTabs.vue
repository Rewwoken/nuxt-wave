<script setup lang="ts">
	const props = defineProps<{
		username: string;
	}>();

	const { tab, tabNames } = useProfileTabs(props.username);
</script>

<template>
	<Tabs v-model:value="tab">
		<TabList>
			<Tab
				v-for="name in tabNames"
				:key="name"
				:value="name"
			>
				<!-- If value is empty string, assume it is 'POSTS' tab -->
				{{ name.toUpperCase() || 'POSTS' }}
			</Tab>
		</TabList>
	</Tabs>
</template>
