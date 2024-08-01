import { profileSchema } from '~/schemas/profile';
import type { FilesData } from '~/server/database/profile';
import { updateProfile } from '~/server/database/profile';
import { cloudinaryDestroy, cloudinaryUpload } from '~/server/cloudinary';

export default defineEventHandler(async (event) => {
  const { fields, files } = await parseForm(event.node.req);

  const formattedFields: Record<string, string> = {};

  const fieldsEntries = Object.entries(fields);
  for (const [name, field] of fieldsEntries) {
    formattedFields[name] = field!.join(' ');
  }

  const parseResult = profileSchema.safeParse(formattedFields);
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors;

    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/fields',
      data: errors,
    });
  }

  const filesData: FilesData = {};
  try {
    if (files.image) {
      const image = files.image[0];
      const { version, public_id, format } = await cloudinaryUpload(image.filepath, 'image');

      filesData.imageUrl = `v${version}/${public_id}.${format}`;
      filesData.imagePublicId = public_id;
    }

    if (files.banner) {
      const banner = files.banner[0];
      const { version, public_id, format } = await cloudinaryUpload(banner.filepath, 'image');

      filesData.bannerUrl = `v${version}/${public_id}.${format}`;
      filesData.bannerPublicId = public_id;
    }

    const profileData = Object.assign(parseResult.data, filesData);

    const userId = event.context.userId;
    return updateProfile(userId, profileData);
  }
  catch {
    if (filesData.imagePublicId) {
      await cloudinaryDestroy(filesData.imagePublicId);
    }
    if (filesData.bannerPublicId) {
      await cloudinaryDestroy(filesData.bannerPublicId);
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'error/unknown',
    });
  }
});
