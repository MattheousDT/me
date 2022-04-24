import { getWritingBySlug } from "$lib/api/writing";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ params }) => {
	const res = await getWritingBySlug(params.slug, true);

	if (!res) {
		return {
			status: 404,
		};
	}

	return {
		body: res,
	};
};
