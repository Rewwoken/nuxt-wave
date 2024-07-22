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
  <SidebarRightBox title="You might like" footer-link="/">
    <li
      v-for="item in items"
      :key="item.handle"
      class="flex items-center gap-x-2"
    >
      <UserImage :src="item.image" class="size-11" />
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
  </SidebarRightBox>
</template>
