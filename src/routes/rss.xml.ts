import type { RequestHandler } from "@sveltejs/kit";
import type { Document } from "@prismicio/client/types/documents";

import api from "$lib/util/api";
import Prismic from "@prismicio/client";

const render = (
	items: Document[]
) => `<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
	<title>Matthew Watt's RSS Feed</title>
	${items
		.map(
			(item) => `
		<item>
			<title>${item.data.title[0].text}</title>
			<link>https://matthewwatt.co.uk/writing/${item.uid}</link>
			<description>${item.data.abstract}</description>
			<pubDate>${new Date(item.data.date).toUTCString()}</pubDate>
		</item>
	`
		)
		.join("\n")}
</channel>
</rss>`;

export const get: RequestHandler = async () => {
	let query = await api.query(Prismic.Predicates.at("my.blog_post.public", true), {
		fetch: ["blog_post.title", "blog_post.date", "blog_post.abstract"],
		orderings: "[my.blog_post.date desc]",
		pageSize: 100,
	});

	const feed = render(query.results);
	return {
		body: feed,
		headers: {
			"Cache-Control": `max-age=0, s-max-age=${600}`, // 10 minutes
			"Content-Type": "application/rss+xml",
		},
	};
};
