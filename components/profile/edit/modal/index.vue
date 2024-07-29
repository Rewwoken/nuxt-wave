<script setup lang="ts">
  import { profileSchema } from '~/schemas/profile';

  const emit = defineEmits<{
    (e: 'closeModal'): void;
  }>();

  const { handleSubmit, errors, defineField, isSubmitting } = useForm({
    validationSchema: toTypedSchema(profileSchema),
  });
  const [name] = defineField('name');
  const [bio] = defineField('bio');
  const [location] = defineField('location');
  const [website] = defineField('website');
  const hasErrors = computed(() => Object.keys(errors.value).length);

  const serverError = ref<string | null>(null);

  const files = reactive<{
    image?: File;
    banner?: File;
  }>({});

  function onFile(key: 'image' | 'banner', file: File) {
    files[key] = file;
  }

  const toast = useToast();
  const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData();

    const textEntries = Object.entries(values);
    for (const [key, value] of textEntries) {
      formData.append(key, value);
    }

    if (files.image) {
      formData.append('image', files.image);
    }

    if (files.banner) {
      formData.append('banner', files.banner);
    }

    const { error } = await useApi('/api/profile', {
      method: 'PATCH',
      body: formData,
    });

    if (error.value) {
      if (error.value.data.message === 'error/fields') {
        serverError.value = 'Invalid fields.';
      }
      else {
        serverError.value = 'Unexpected error, please try again later.';
      }

      toast.add({
        severity: 'error',
        summary: 'An error occurred during profile change!',
        detail: serverError.value,
        life: 3000,
      });

      return null;
    }

    toast.add({
      severity: 'success',
      summary: 'Profile has been successfully changed!',
      detail: 'This may take some time, please update the page.',
      life: 3000,
    });

    emit('closeModal');
  });
</script>

<template>
  <ProfileEditModalHeader
    :is-pending="isSubmitting"
    :has-errors="!!hasErrors"
    @close-modal="$emit('closeModal')"
    @on-submit="onSubmit"
  />
  <ProfileEditModalBanner @on-file="onFile" />
  <ProfileEditModalImage @on-file="onFile" />
  <form
    autocomplete="off"
    class="flex flex-col gap-y-8 p-3"
    novalidate
  >
    <div class="relative flex flex-col">
      <InputText
        v-model="name"
        type="text"
        size="large"
        autocomplete="new-password"
        placeholder="Name"
        aria-describedby="name-help"
        :maxlength="50"
        :invalid="errors.name"
        pt:root:class="dark:!border-gray-700 !py-4 dark:!bg-dim dark:!text-white"
      />
      <span class="absolute top-1 right-4 text-sm text-gray-600">{{ name?.length || 0 }} / 50</span>
      <small
        v-if="errors.name"
        id="name-help"
        class="ml-2 text-xs text-red-500"
      >
        {{ errors.name }}
      </small>
    </div>
    <div class="relative flex flex-col">
      <Textarea
        v-model="bio"
        autocomplete="new-password"
        placeholder="Bio"
        aria-describedby="bio-help"
        :maxlength="160"
        :invalid="errors.bio"
        :auto-resize="true"
        pt:root:class="dark:!border-gray-700 !py-4 dark:!bg-dim dark:!text-white"
      />
      <span class="absolute top-1 right-4 text-sm text-gray-600">{{ bio?.length || 0 }} / 160</span>
      <small
        v-if="errors.bio"
        id="bio-help"
        class="ml-2 text-xs text-red-500"
      >
        {{ errors.bio }}
      </small>
    </div>
    <div class="relative flex flex-col">
      <InputText
        v-model="location"
        type="text"
        size="large"
        autocomplete="new-password"
        placeholder="Location"
        aria-describedby="location-help"
        :maxlength="30"
        :invalid="errors.location"
        pt:root:class="dark:!border-gray-700 !py-4 dark:!bg-dim dark:!text-white"
      />
      <span class="absolute top-1 right-4 text-sm text-gray-600">{{ location?.length || 0 }} / 30</span>
      <small
        v-if="errors.location"
        id="location-help"
        class="absolute -bottom-5 ml-2 text-xs text-red-500"
      >
        {{ errors.location }}
      </small>
    </div>
    <div class="relative flex flex-col gap-y-1">
      <InputText
        v-model="website"
        type="text"
        size="large"
        autocomplete="new-password"
        placeholder="Website"
        aria-describedby="website-help"
        :maxlength="50"
        :invalid="errors.website"
        pt:root:class="dark:!border-gray-700 !py-4 dark:!bg-dim dark:!text-white"
      />
      <span class="absolute top-1 right-4 text-sm text-gray-600">{{ website?.length || 0 }} / 50</span>
      <small
        v-if="errors.website"
        id="website-help"
        class="ml-2 text-xs text-red-500"
      >
        {{ errors.website }}
      </small>
    </div>
  </form>
</template>
