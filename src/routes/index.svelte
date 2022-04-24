<script lang="ts">
	import type { ProjectPost } from "$lib/api/projects";

	import Hero from "$lib/components/home/hero.svelte";
	import LogoWall from "$lib/components/home/logo_wall.svelte";
	import Projects from "$lib/components/home/projects.svelte";

	export const prerender = true;
	export let projects: ProjectPost[];
</script>

<svelte:head>
	<title>Matthew Watt</title>
</svelte:head>

<Hero />
<LogoWall />
<Projects {projects} />
