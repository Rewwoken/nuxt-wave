import type { MediaItem } from '~/types/new-post.types';

export function useNewPostMedia() {
  const items = ref<MediaItem[]>([]);

  const handleMediaAdd = (file: File, mimetype: string, url: string) => {
    items.value.push({ file, mimetype, url });
  };

  const handleMediaDelete = (index: number) => {
    items.value.splice(index, 1);
  };

  return { items, handleMediaAdd, handleMediaDelete };
}
