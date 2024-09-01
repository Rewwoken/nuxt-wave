export interface CreatePostArgs {
	userId: string;
	rootId?: string;
	parentId?: string;
	text: string;
	files: ValidatedFormFile[];
}
