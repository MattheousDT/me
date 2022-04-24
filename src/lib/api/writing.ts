export type WritingMetadata = {
	title: string;
	cover: string;
	date: string;
	description: string;
};

export type WritingPost = { slug: string; metadata: WritingMetadata; body?: any };

export const getAllWriting = async (body = false): Promise<WritingPost[]> => {
	const all = import.meta.glob("/content/writing/*.md");

	return Promise.all(
		Object.entries(all).map(async ([file, md]) => {
			const content = await md();

			return {
				slug: file.split("/").at(-1)?.replace(".md", "")!,
				metadata: content.metadata,
				body: body ? content.default : null,
			};
		})
	);
};

export const getWritingBySlug = async (slug: string, body = false): Promise<WritingPost | null> => {
	const all = await getAllWriting(body);
	return all.find((x) => x.slug === slug) ?? null;
};
