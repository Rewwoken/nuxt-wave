<script setup lang="ts">
  const route = useRoute();
  const toast = useToast();

  onMounted(async () => {
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
        summary: 'Email verified successfully!',
        detail: 'You can log in now.',
        life: 7000,
      });
    }
    catch {
      toast.add({
        severity: 'error',
        summary: 'Error verifying email!',
        detail: 'Please, try again later.',
        life: 7000,
      });
    }
    finally {
      await navigateTo('/auth');
    }
  });
</script>

<template>
  <div class="pointer-events-none select-none">
    <Auth />
  </div>
</template>
