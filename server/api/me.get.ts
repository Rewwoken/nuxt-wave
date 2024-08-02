export default defineEventHandler({
	onRequest: [auth],
	handler: (event) => {
		return event.context.user;
	},
});
