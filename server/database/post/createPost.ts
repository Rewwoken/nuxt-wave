import { prisma } from '~/server/database';
import { cloudinaryDestroy, cloudinaryUpload } from '~/server/cloudinary';
import type { ValidatedMediaFile } from '~/server/utils/validateMediaFiles';

export async function createPost(
  userId: string,
  parentPostId: string | undefined,
  text: string,
  files: ValidatedMediaFile[],
) {
  return prisma.$transaction(async (tx) => {
    const parentPost = { connect: { id: parentPostId } };

    const post = await tx.post.create({
      data: {
        user: {
          connect: { id: userId },
        },
        parentPost: parentPostId ? parentPost : undefined,
        text,
      },
    });

    const uploadIds: Array<{ publicId: string }> = [];
    const createdIds: Array<{ id: string }> = [];

    for (const file of files) {
      try {
        const { public_id, version, format } = await cloudinaryUpload(file.filepath, file.type);
        uploadIds.push({ publicId: public_id });

        const mediaFile = await tx.mediaFile.create({
          data: {
            post: { connect: { id: post.id } },
            publicId: public_id,
            url: `v${version}/${public_id}.${format}`,
            mimetype: file.mimetype,
          },
        });
        createdIds.push({ id: mediaFile.id });
      }
      catch (err) {
        for (const upload of uploadIds) {
          await cloudinaryDestroy(upload.publicId);
        }
        for (const mediaFile of createdIds) {
          await tx.mediaFile.delete({
            where: { id: mediaFile.id },
          });
        }

        throw err;
      }
    }
  });
}
