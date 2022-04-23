import adapter from "@sveltejs/adapter-vercel";
import { readFileSync } from "fs";
import { mdsvex } from "mdsvex";
import path from "path";
import shiki from "shiki";
import preprocess from "svelte-preprocess";
import Icons from "unplugin-icons/vite";
import WindiCSS from "vite-plugin-windicss";

const palenightTheme = JSON.parse(readFileSync(path.join(process.cwd(), "./bin/palenight.json")));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],
	preprocess: [
		mdsvex({
			extensions: [".md"],
			highlight: {
				highlighter: async (code, lang) => {
					const html = (
						await shiki.getHighlighter({
							theme: palenightTheme,
						})
					)
						.codeToHtml(code, { lang })
						.replace(/[{}`]/g, (c) => ({ "{": "&#123;", "}": "&#125;", "`": "&#96;" }[c]))
						.replace(/\\([trn])/g, "&#92;$1");

					return `{@html \`${html}\` }`;
				},
			},
		}),
		preprocess(),
	],
	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
				Icons({
					compiler: "svelte",
				}),
				WindiCSS(),
			],
		},
	},
};

export default config;
