export type ProjectMetadata = {
	client: string;
	title: string;
	cover: string;
	date: string;
	description: string;
	featured: boolean;
	priority: number;
};

export type ProjectPost = { slug: string; metadata: ProjectMetadata; body?: any };

export const getAllProjects = async (
	body = false,
	onlyFeatured = false
): Promise<ProjectPost[]> => {
	const all = import.meta.glob("/content/projects/*.md");

	const res: ProjectPost[] = await Promise.all(
		Object.entries(all).map(async ([file, md]) => {
			const content = await md();

			return {
				slug: file.split("/").at(-1)?.replace(".md", "")!,
				metadata: content.metadata,
				body: body ? content.default : null,
			};
		})
	);

	if (onlyFeatured) return res.filter((x) => x.metadata.featured);
	return res;
};

export const getProjectBySlug = async (slug: string, body = false): Promise<ProjectPost | null> => {
	const all = await getAllProjects(body);
	return all.find((x) => x.slug === slug) ?? null;
};
