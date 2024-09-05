<script setup lang="ts">
	import { profileEditFields } from '~/components/profile/edit/form/profile-edit-fields';

	const emit = defineEmits<{
		(e: 'onClose'): void;
	}>();

	const { authUser } = useAuth();
	const currentImage = authUser.value.profile!.imageUrl;
	const currentBanner = authUser.value.profile!.bannerUrl;

	const {
		image,
		banner,
		updateImage,
		updateBanner,
	} = useProfileEditFiles();

	const {
		hasErrors,
		handleSubmit,
		isSubmitting,
	} = useZodForm(updateProfileSchema);

	const { submitProfileEdit } = useProfileEditRequest();

	const onSubmit = handleSubmit(async (values) => {
		await submitProfileEdit(image.file.value, banner.file.value, values);
		emit('onClose');
	});
</script>

<template>
	<ProfileEditHeader
		:has-errors="hasErrors"
		:is-submitting="isSubmitting"
		@on-submit="onSubmit"
		@on-close="$emit('onClose')"
	/>
	<ProfileEditBanner
		:url="banner.url.value || currentBanner"
		:is-cloudinary="!banner.url.value"
		@on-file="updateBanner"
	/>
	<ProfileEditImage
		:url="image.url.value || currentImage"
		:is-cloudinary="!image.url.value"
		@on-file="updateImage"
	/>
	<form class="flex flex-col gap-y-4 p-3">
		<ProfileEditField
			v-for="field in profileEditFields"
			:key="field.name"
			v-bind="field"
		/>
	</form>
</template>
