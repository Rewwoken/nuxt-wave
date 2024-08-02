// TODO: implement countNotifications function
export default defineEventHandler({
	onRequest: [auth],
	handler: () => {
		// return countNotifications(event.context.user.id);
		return 2;
	},
});
