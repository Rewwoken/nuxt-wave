/* eslint-disable unused-imports/no-unused-vars */
export default defineNuxtPlugin((nuxtApp) => {
  const headers = useRequestHeaders(['cookie']);

  const api = $fetch.create({
    onRequest({ request, options, error }) {
      options.headers = headers;
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/auth'));
      }
    },
  });

  return {
    provide: { api },
  };
});
