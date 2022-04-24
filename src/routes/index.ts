import { getAllProjects } from "$lib/api/projects";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({}) => {
	return {
		body: {
			projects: (await getAllProjects(false, true)).sort(
				(a, b) => b.metadata.priority - a.metadata.priority
			),
		},
	};
};
