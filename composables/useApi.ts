export const useAPI: typeof useFetch = (url, options) => {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api,
  });
};
