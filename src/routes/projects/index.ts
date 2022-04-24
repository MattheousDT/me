import { getAllProjects } from "$lib/api/projects";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({}) => {
	return {
		body: {
			projects: (await getAllProjects()).sort(
				(a, b) => new Date(b.metadata.date).valueOf() - new Date(a.metadata.date).valueOf()
			),
		},
	};
};
