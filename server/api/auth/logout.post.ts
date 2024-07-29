export default defineEventHandler((event) => {
  setCookie(event, 'accessToken', '');
  setCookie(event, 'refreshToken', '');

  event.node.res.statusCode = 200;
});
