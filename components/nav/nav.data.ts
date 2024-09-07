export interface NavItem {
	icon: string;
	to: string;
	text: string;
}

export const navItems: NavItem[] = [
	{ icon: 'pi-home', to: '/home', text: 'Home' },
	{ icon: 'pi-hashtag', to: '/explore', text: 'Explore' },
	{ icon: 'pi-bell', to: '/notifications', text: 'Notifications' },
	{ icon: 'pi-envelope', to: '/messages', text: 'Messages' },
	{ icon: 'pi-bookmark', to: '/bookmarks', text: 'Bookmarks' },
	{ icon: 'pi-ellipsis-h', to: '/settings', text: 'Settings' },
];
