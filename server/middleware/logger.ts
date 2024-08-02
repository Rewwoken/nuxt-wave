/* eslint-disable no-console */
export default defineEventHandler({
	handler: async (event) => {
		if (event.path.startsWith('/api')) {
			console.log(`REQUEST  [${event.node.req.method}]  ${event.path}`);
		}
	},
	onBeforeResponse: (event) => {
		if (event.path.startsWith('/api') && event.node.res.statusCode >= 400) {
			console.log(`RESPONSE [${event.node.res.statusCode}]  ${event.path}`);
		}
	},
});
