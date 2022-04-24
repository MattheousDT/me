import { getAllWriting } from "$lib/api/writing";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({}) => {
	return {
		body: { posts: await getAllWriting() },
	};
};
