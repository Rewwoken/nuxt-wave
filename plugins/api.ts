/* eslint-disable unused-imports/no-unused-vars */
export default defineNuxtPlugin((nuxtApp) => {
  const headers = useRequestHeaders(['cookie']);

  const api = $fetch.create({
    onRequest: ({ request, options, error }) => {
      options.headers = headers;
    },
    onResponseError: async ({ response }) => {
      if (response.status === 401) {
        await $fetch('/api/auth/logout', {
          method: 'POST',
        });

        await nuxtApp.runWithContext(async () => await navigateTo('/auth'));
      }
    },
  });

  return {
    provide: { api },
  };
});
