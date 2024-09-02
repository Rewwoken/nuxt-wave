export default defineAuthEventHandler((event) => {
	return authUser(event);
});
