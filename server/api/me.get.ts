export default defineEventHandler({
	onRequest: [auth],
	handler: (event) => {
		return getCurrentUser(event);
	},
});
