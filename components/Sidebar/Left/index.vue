<template>
	<div class="flex flex-col w-full">
		<NuxtLink to="/" class="p-2 transition-colors rounded-full size-12 hover:bg-gray-500/10">
			<LogoNuxt />
		</NuxtLink>
		<nav class="flex flex-col items-start gap-y-4">
			<SidebarLeftLink to="/home" icon="pi-home" text="Home" />
			<SidebarLeftLink to="/explore" icon="pi-hashtag" text="Explore" />
			<SidebarLeftLink to="/notifications" icon="pi-bell" text="Notifications" />
			<SidebarLeftLink to="/messages" icon="pi-envelope" text="Messages" />
			<SidebarLeftLink to="/bookmarks" icon="pi-bookmark" text="Bookmarks" />
			<SidebarLeftLink to="/lists" icon="pi-file" text="Lists" />
			<SidebarLeftLink to="/profile" icon="pi-user" text="Profile" />
			<SidebarLeftLink to="/more" icon="pi-ellipsis-h" text="More" />
		</nav>
		<button class="w-full py-2 mt-4 text-white rounded-full bg-sky-500">
			New
		</button>
	</div>
</template>
