import type formidable from 'formidable';
import { prisma } from '~/server/database';
import { cloudinaryDestroy, cloudinaryUpload } from '~/server/cloudinary';

export async function getPost(id: string | undefined) {
  return prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      mediaFiles: {
        select: {
          url: true,
        },
      },
      replyTo: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  });
}

export async function createPost(
  userId: string,
  replyToId: string | undefined,
  text: string,
  files: formidable.Files<string>,
) {
  return prisma.$transaction(async (tx) => {
    const replyTo = { connect: { id: replyToId } };

    const post = await tx.post.create({
      data: {
        user: {
          connect: { id: userId },
        },
        replyTo: replyToId ? replyTo : undefined,
        text,
      },
    });

    const uploadResponses: Array<{ providerId: string }> = [];
    const mediaFiles: Array<{ id: string }> = [];

    for (const fileName in files) {
      const file = files[fileName]![0];

      try {
        const { public_id, version, format } = await cloudinaryUpload(file.filepath);
        uploadResponses.push({ providerId: public_id });

        const mediaFile = await tx.mediaFile.create({
          data: {
            post: { connect: { id: post.id } },
            providerId: public_id,
            url: `v${version}/${public_id}.${format}`,
          },
        });
        mediaFiles.push({ id: mediaFile.id });
      }
      catch (err) {
        for (const upload of uploadResponses) {
          await cloudinaryDestroy(upload.providerId);
        }
        for (const mediaFile of mediaFiles) {
          await tx.mediaFile.delete({
            where: { id: mediaFile.id },
          });
        }

        throw err;
      }
    }
  });
}
