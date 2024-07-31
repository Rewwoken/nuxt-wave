/* eslint-disable unused-imports/no-unused-vars */
export default defineNuxtPlugin((nuxtApp) => {
  const accessToken = useCookie('accessToken');
  const headers = useRequestHeaders(['authorization', 'cookie']);

  const api = $fetch.create({
    onRequest: ({ request, options, error }) => {
      headers.authorization = `Bearer ${accessToken.value}`;
      options.headers = headers;
    },
    onResponseError: async ({ response }) => {
      if (response.status === 401) {
        await $fetch('/api/auth/logout', {
          method: 'POST',
        });

        await nuxtApp.runWithContext(() => navigateTo('/auth'));
      }
    },
  });

  return {
    provide: { api },
  };
});
