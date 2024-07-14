export default defineEventHandler((event) => {
  setCookie(event, 'accessToken', '');
  setCookie(event, 'refreshToken', '');
});
