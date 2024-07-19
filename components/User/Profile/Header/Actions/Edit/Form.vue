<script setup lang="ts">
  import { profileSchema } from '~/schemas/profile';

  const emit = defineEmits(['closeModal']);

  const { handleSubmit, errors, defineField } = useForm({
    validationSchema: toTypedSchema(profileSchema),
  });
  const [name] = defineField('name');
  const hasErrors = computed(() => Object.keys(errors.value).length);

  const { handleRequest, isPending, serverError } = useHandleForm(profileSchema);

  const toast = useToast();
  const onSubmit = handleSubmit(async (values) => {
    await handleRequest('PATCH', '/api/profile', values);

    if (serverError.value) {
      toast.add({
        severity: 'error',
        summary: '...',
        detail: '...',
        life: 3000,
      });

      return null;
    }

    toast.add({
      severity: 'success',
      summary: '...',
      detail: '...',
      life: 3000,
    });

    emit('closeModal');
  });
</script>

<template>
  <UserProfileHeaderActionsEditHeader
    :is-pending="isPending"
    :has-errors="!!hasErrors"
    @close-modal="$emit('closeModal')"
  />
  <form
    autocomplete="off"
    class="flex flex-col gap-y-2"
    novalidate
    @submit="onSubmit"
  >
    <InputText
      v-model="name"
      type="text"
      size="large"
      autocomplete="new-password"
      placeholder="Name"
      aria-describedby="name-help"
      :invalid="errors.name"
      pt:root:class="dark:bg-dim dark:border-gray-700"
      autofocus
      fluid
    />
    <small v-if="errors.name" id="name-help" class="ml-2 text-xs text-red-500">
      {{ errors.name }}
    </small>
  </form>
</template>
