<script lang="ts">
	import type { ProjectPost } from "$lib/api/projects";

	export let projects: ProjectPost[];
</script>

<svelte:head>
	<title>Projects | Matthew Watt</title>
</svelte:head>

<div class="container my-20">
	<div class="mb-8">
		<h1 class="font-heading text-5xl lg:text-6xl text-sky-800 font-bold uppercase w-3xl max-w-full">
			Projects
		</h1>
		<big class="text-lg mt-4 text-sky-700 font-medium w-xl max-w-full">
			A collection of my work from over the years.
			<br />
			New projects being added as I go.
		</big>
	</div>
	<div class="grid grid-cols-3 gap-x-8 gap-y-16">
		{#each projects as { metadata, slug }}
			<article class="group">
				<a href="/projects/{slug}">
					<img class="h-60 w-full object-cover" src={metadata.cover} alt="" height={240} />
					<h2
						class="text-sky-800 group-hover:text-pink font-bold font-heading uppercase text-xl mt-5"
					>
						{metadata.title}
					</h2>
					<p class="text-sky-700">
						{metadata.description}
					</p></a
				>
			</article>
		{/each}
	</div>
</div>
