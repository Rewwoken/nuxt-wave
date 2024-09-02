export interface CreatePostData {
	userId: string;
	rootId?: string;
	parentId?: string;
	text: string;
	files: ValidatedFormFile[];
}
