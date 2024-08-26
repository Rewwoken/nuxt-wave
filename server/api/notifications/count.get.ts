// TODO: implement countNotifications function
export default defineEventHandler({
	onRequest: [auth],
	handler: () => {
		// const id = getCurrentUser('id');
		// return countNotificationsByUserId(id);
		return 2;
	},
});
