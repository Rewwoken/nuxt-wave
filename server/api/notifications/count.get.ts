// TODO: implement countNotifications function
export default defineEventHandler({
	onRequest: [auth],
	handler: (event) => {
		setResponseStatus(event, 200);
		// return countNotifications(event.context.user.id);
		return 2;
	},
});
