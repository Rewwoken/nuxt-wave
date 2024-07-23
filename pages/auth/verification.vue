<script setup lang="ts">
  definePageMeta({
    layout: false,
  });

  const toast = useToast();
  onMounted(async () => {
    const route = useRoute();

    try {
      await $fetch('/api/auth/verification', {
        method: 'GET',
        query: {
          id: route.query.id,
          code: route.query.code,
        },
      });

      toast.add({
        severity: 'success',
        summary: 'Email verifying successfully!',
        detail: 'You can now log in.',
        life: 3000,
      });
    }
    catch {
      toast.add({
        severity: 'error',
        summary: 'Error verifying email!',
        detail: 'Please, try again later.',
        life: 3000,
      });
    }
    finally {
      await navigateTo('/auth');
    }
  });
</script>

<template>
  <span>TODO: loader</span>
</template>
