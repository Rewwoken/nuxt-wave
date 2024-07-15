<script setup lang="ts">
  import { registerSchema } from '~/schemas/register';

  const emit = defineEmits(['closeModal']);

  const { handleSubmit, errors, defineField } = useForm({
    validationSchema: toTypedSchema(registerSchema),
  });
  const [name] = defineField('name');
  const [username] = defineField('username');
  const [password] = defineField('password');
  const hasErrors = computed(() => Object.keys(errors.value).length);

  const { register, isPending, serverError } = useAuth();

  const toast = useToast();
  const onSubmit = handleSubmit(async (values) => {
    await register(values);

    if (serverError.value) {
      return null;
    }

    toast.add({
      severity: 'success',
      summary: 'Registration successful!',
      detail: 'Now you can log in to a new account.',
      life: 3000,
    });

    emit('closeModal');
  });
</script>

<template>
  <form
    autocomplete="off"
    class="flex flex-col gap-y-2"
    novalidate
    @submit="onSubmit"
  >
    <IconField class="w-full">
      <InputIcon class="pi pi-users" />
      <InputText
        v-model="name"
        type="text"
        autocomplete="new-password"
        placeholder="Name"
        aria-describedby="name-help"
        class="w-full"
        :invalid="errors.name"
        autofocus
      />
    </IconField>
    <small
      v-if="errors.name"
      id="name-help"
      class="ml-2 text-xs text-red-500"
    >
      {{ errors.name }}
    </small>
    <IconField class="w-full">
      <InputIcon class="pi pi-user" />
      <InputText
        v-model="username"
        type="text"
        autocomplete="new-password"
        placeholder="Username"
        aria-describedby="username-help"
        :invalid="errors.username"
      />
    </IconField>
    <small
      v-if="errors.username"
      id="username-help"
      class="ml-2 text-xs text-red-500"
    >
      {{ errors.username }}
    </small>
    <IconField class="w-full">
      <InputIcon class="pi pi-lock" />
      <InputText
        v-model="password"
        type="password"
        autocomplete="new-password"
        placeholder="Password"
        aria-describedby="password-help"
        :invalid="errors.password"
      />
    </IconField>
    <small
      v-if="errors.password"
      id="password-help"
      class="ml-2 text-xs text-red-500"
    >
      {{ errors.password }}
    </small>
    <Message
      v-if="serverError"
      severity="error"
      closable
    >
      {{ serverError }}
    </Message>
    <div class="flex items-end justify-between">
      <IconNuxt class="size-10 fill-dim" />
      <Button
        label="Submit"
        size="small"
        class="!text-white mt-1 self-end px-6"
        type="submit"
        :loading="isPending"
        :disabled="hasErrors"
      />
    </div>
  </form>
</template>
