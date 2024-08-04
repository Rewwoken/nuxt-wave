/* eslint-disable no-console */
export default defineEventHandler({
	handler: () => {
		return void 0;
	},
	onBeforeResponse: (event) => {
		if (event.path.startsWith('/api')) {
			const info = `[NITRO] ${event.node.res.statusCode} RESPONSE ${event.method}`;

			console.log(`${info.padEnd(26, ' ')} ${event.path}`);
		}
	},
});
