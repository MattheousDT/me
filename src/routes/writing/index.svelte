<script lang="ts">
	import type { WritingPost } from "$lib/api/writing";

	export let posts: WritingPost[];
</script>

<svelte:head>
	<title>Blog | Matthew Watt</title>
</svelte:head>

<div class="container my-20">
	<div class="grid grid-cols-3 gap-x-8 gap-y-16">
		{#each posts as { metadata, slug }}
			<article class="group">
				<a href="/writing/{slug}">
					<img class="h-60 w-full object-cover" src={metadata.cover} alt="" height={240} />
					<h2
						class="text-sky-800 group-hover:text-pink font-bold font-heading uppercase text-xl mt-5"
					>
						{metadata.title}
					</h2>
					<p class="text-sky-700">
						{metadata.description}
					</p>
				</a>
			</article>
		{/each}
	</div>
</div>
