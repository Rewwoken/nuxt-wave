<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'onClose'): void;
	}>();

	const {
		hasErrors,
		handleSubmit,
		isSubmitting,
	} = useZodForm(updateProfileSchema);

	const {
		image,
		banner,
		updateImage,
		updateBanner,
	} = useProfileEditFiles();

	const { submitProfileEdit } = useProfileEditRequest();

	const onSubmit = handleSubmit(
		async (values) => {
			await submitProfileEdit(image.value, banner.value, values);
			emit('onClose');
		},
	);
</script>

<template>
	<ProfileEditHeader
		:has-errors="hasErrors"
		:is-submitting="isSubmitting"
		@on-close="onSubmit"
	/>
	<ProfileEditBanner @on-file="updateBanner" />
	<ProfileEditImage @on-file="updateImage" />
	<!-- TODO: handle empty fields case -->
	<form
		class="flex flex-col gap-y-4 p-3"
		novalidate
	>
		<ProfileEditField
			is="input"
			type="text"
			name="name"
			placeholder="Name"
			autocomplete="name"
			:max-length="50"
		/>
		<ProfileEditField
			is="textarea"
			type="text"
			name="bio"
			placeholder="Bio"
			autocomplete="new-password"
			:max-length="160"
		/>
		<ProfileEditField
			is="input"
			type="text"
			name="location"
			placeholder="Location"
			autocomplete="country-name"
			:max-length="30"
		/>
		<ProfileEditField
			is="input"
			type="text"
			name="website"
			placeholder="Website"
			autocomplete="url"
			:max-length="50"
		/>
	</form>
</template>
