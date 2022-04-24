<script lang="ts">
	import type { WritingMetadata } from "$lib/api/writing";

	export const prerender = true;
	export let body: any;
	export let metadata: WritingMetadata;

	console.log(body);

	const dateFmt = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" });
</script>

<div class="container my-16 lg:my-20">
	<div class="max-w-full mx-auto">
		<div class="mb-10">
			<div class="flex items-center w-full mb-4 h-[1em] w-full relative">
				<span class="w-24 max-w-full bg-pink h-[1em] mr-2" />
				<p class="font-heading text-xl text-pink font-bold uppercase flex-1">
					{dateFmt.format(new Date(metadata.date))}
				</p>
			</div>
			<h1
				class="font-heading text-5xl lg:text-6xl text-sky-800 font-bold uppercase w-3xl max-w-full"
			>
				{metadata.title}
			</h1>
			<big class="text-lg mt-4 text-sky-700 font-medium w-xl max-w-full">
				{metadata.description}
			</big>
		</div>

		<img class="h-xs md:h-md lg:h-lg w-full object-cover" src={metadata.cover} alt="" />

		<div class="md text-sky-700 text-xl mx-auto leading-loose my-16 lg:my-20">
			{#if body}
				<svelte:component this={body} />
			{/if}
		</div>
	</div>
</div>

<style lang="scss" global>
	.md {
		> * {
			@apply lg:w-2xl mx-auto max-w-full;
		}

		> h2,
		> h3,
		> h4,
		> h5,
		> h6 {
			@apply font-heading font-bold text-sky-800 uppercase not-first:mt-16 lg:not-first:mt-20;
			letter-spacing: -0.03em;
		}

		> p {
			@apply mt-5;
		}

		> h2 {
			@apply text-4xl;
		}

		> h3 {
			@apply text-3xl;
		}

		> h4 {
			@apply text-2xl;
		}

		> h5 {
			@apply text-xl;
		}

		:not(.shiki) > code {
			@apply bg-sky-50 px-2;
		}

		.shiki {
			@apply my-10 text-base p-8 overflow-x-auto;
		}

		.shiki,
		img {
			@apply w-5xl my-10 lg:my-20;
		}

		img {
			@apply lg:max-w-none lg:ml-1/2 lg:transform lg:-translate-x-1/2;
		}

		> blockquote {
			@apply my-20 border-l-4 border-sky-100 p-2 pl-4 italic;
		}

		a {
			@apply text-pink font-bold hover:underline hover:text-pink-700;
		}

		kbd {
			@apply bg-sky-50 px-2 border-b-2 border-sky-200;
		}

		ul,
		ol {
			@apply my-10 px-0;
			li {
				@apply ml-6 relative mb-2;
			}
		}

		ul li::before {
			content: "";
			top: calc(1em - 0.25rem);
			@apply bg-pink absolute h-2 w-2 -left-6;
		}

		ol li::marker {
			@apply text-pink font-bold;
		}

		table {
			margin: 2rem 0;
			width: 100%;
			border: 2px solid #e9e9e9;
			border-collapse: separate;
			border-left: 0;
			border-radius: 0.5rem;
			border-spacing: 0px;
		}
		thead {
			display: table-header-group;
			vertical-align: middle;
			border-color: inherit;
			border-collapse: separate;
			@apply text-blue-900;
		}
		tr {
			display: table-row;
			vertical-align: inherit;
			border-color: inherit;
		}
		th,
		td {
			padding: 10px 20px;
			text-align: left;
			vertical-align: top;
			border-left: 2px solid #e9e9e9;
		}
		td {
			border-top: 2px solid #e9e9e9;
		}
		thead:first-child tr:first-child th:first-child,
		tbody:first-child tr:first-child td:first-child {
			border-radius: 0.5rem 0 0 0;
		}
		thead:last-child tr:last-child th:first-child,
		tbody:last-child tr:last-child td:first-child {
			border-radius: 0 0 0 0.5rem;
		}
	}
</style>
