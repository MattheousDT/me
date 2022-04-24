<script lang="ts">
	import type { ProjectPost } from "$lib/api/projects";

	import { onDestroy, onMount } from "svelte";
	import { expoOut } from "svelte/easing";
	import { fade, fly, scale } from "svelte/transition";
	import IconArrowDown from "~icons/carbon/arrow-down";
	import IconArrowRight from "~icons/carbon/arrow-right";
	import IconArrowUp from "~icons/carbon/arrow-up";
	import IconSearch from "~icons/carbon/search";

	export let projects: ProjectPost[];

	let autoplaySpeed = 8000;
	let direction = 0;
	let current = 0;
	$: project = projects[current];

	let decrement = () => {
		direction = -1;
		current = current === 0 ? projects.length - 1 : current - 1;
		clearInterval(interval);
		interval = setInterval(increment, autoplaySpeed);
	};

	let increment = () => {
		direction = 1;
		current = current === projects.length - 1 ? 0 : current + 1;
		clearInterval(interval);
		interval = setInterval(increment, autoplaySpeed);
	};

	let interval: NodeJS.Timeout;

	onMount(() => {
		interval = setInterval(increment, autoplaySpeed);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<svelte:head>
	{#each projects as { metadata }}
		<link rel="preload" as="image" href={metadata.cover} />
	{/each}
</svelte:head>

<section class="py-20">
	<div class="container">
		<h2 class="font-medium text-xl text-center text-sky-700 mb-20">
			...and here’s some projects I’ve worked on
		</h2>
		<div class="flex items-center w-full mb-4 h-[1em] w-full relative">
			<span class="w-24 max-w-full bg-pink h-[1em]" />
			{#key project}
				<p
					in:fade={{ delay: 200, duration: 800, easing: expoOut }}
					out:fade|local={{ duration: 800, delay: 0, easing: expoOut }}
					class="font-heading text-xl text-pink font-bold uppercase flex-1 absolute left-26"
				>
					{project.metadata.client}
				</p>
			{/key}
		</div>
		<div class="font-heading text-6xl h-[2em]">
			{#key project}
				<h1
					in:fly={{ y: 16 * direction, delay: 200, duration: 800, easing: expoOut }}
					out:fly|local={{ y: -16 * direction, duration: 800, delay: 0, easing: expoOut }}
					class="text-sky-800 font-bold uppercase w-3xl max-w-full absolute"
				>
					{project.metadata.title}
				</h1>
			{/key}
		</div>
		<div class="text-lg h-[3em] mt-4">
			{#key project}
				<p
					in:fly={{ y: 16 * direction, delay: 200, duration: 800, easing: expoOut }}
					out:fly|local={{ y: -16 * direction, duration: 800, delay: 0, easing: expoOut }}
					class="text-sky-700 font-medium w-xl max-w-full absolute"
				>
					{project.metadata.description}
				</p>
			{/key}
		</div>
	</div>
	<div class="2xl:container">
		<div class="w-full h-lg flex mt-10 2xl:w-[calc(100%+5.5rem)] 2xl:max-w-screen 2xl:-mx-11">
			<div class="relative flex-1 overflow-hidden">
				{#key project}
					<img
						in:scale={{ delay: 0, duration: 1000, start: 1.2, easing: expoOut }}
						out:fade|local={{ duration: 0, delay: 1100 }}
						draggable={false}
						class="object-cover h-full w-full absolute left-0 top-0 select-none"
						src={project.metadata.cover}
						alt=""
					/>
				{/key}
			</div>
			<div class="w-64 flex flex-col flex-shrink-0">
				<a
					sveltekit:prefetch
					href="/projects/{project.slug}"
					class="bg-pink flex-1 flex items-center justify-center text-white transition-colors hover:bg-pink-800 active:bg-pink-900"
				>
					<IconSearch width="5rem" height="5rem" />
				</a>
				<div class="flex">
					<button
						on:click={decrement}
						class="w-1/2 aspect-square bg-pink-600 flex items-center justify-center text-white transition-colors group hover:bg-pink-800 active:bg-pink-900"
					>
						<IconArrowUp
							class="transition-transform transform group-hover:-translate-y-1"
							width="3.25rem"
							height="3.25rem"
						/>
					</button>
					<button
						on:click={increment}
						class="w-1/2 aspect-square bg-pink-700 flex items-center justify-center text-white transition-colors group hover:bg-pink-800 active:bg-pink-900"
					>
						<IconArrowDown
							class="transition-transform transform group-hover:translate-y-1"
							width="3.25rem"
							height="3.25rem"
						/>
					</button>
				</div>
			</div>

			<div
				class="mx-5 grid gap-5"
				style="grid-template-rows: repeat({projects.length}, minmax(0, 1fr))"
			>
				{#each projects as _, i}
					<div class="relative bg-pink-50 h-full w-1 overflow-hidden">
						<span
							class="absolute left-0 top-0 w-full bg-pink"
							style:height={interval && i === current ? "100%" : "0%"}
							style:opacity={interval && i === current ? "1" : "0"}
							style:transition={i === current
								? `height ${autoplaySpeed}ms linear`
								: `height 0ms 1000ms linear, opacity 500ms linear`}
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="container mt-5">
		<a
			sveltekit:prefetch
			href="/projects"
			class="font-heading text-pink text-xl inline-flex items-center font-bold uppercase hover:text-pink-700 group"
		>
			View all projects
			<IconArrowRight
				class="ml-2 transform transition-transform group-hover:translate-x-1"
				width="1em"
				height="1em"
			/>
		</a>
	</div>
</section>
