export default defineEventHandler({
	onRequest: [auth],
	handler: (event) => {
		setResponseStatus(event, 200);
		return event.context.user;
	},
});
