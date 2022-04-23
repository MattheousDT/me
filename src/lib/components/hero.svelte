<script lang="ts">
	import { fade, scale, fly, slide } from "svelte/transition";
	import { expoOut } from "svelte/easing";

	import IconArrowUp from "~icons/carbon/arrow-up";
	import IconArrowDown from "~icons/carbon/arrow-down";
	import IconArrowRight from "~icons/carbon/arrow-right";
	import IconSearch from "~icons/carbon/search";
	import { onDestroy, onMount } from "svelte";

	let articles = [
		{
			client: "Deskpro",
			title: "Making payments and subscriptions easily",
			abstract: "How I created the billing dashboard for Deskpro Horizon",
			link: "/projects/deskpro-billing",
			image: "/img/hero/deskpro-billing.jpg",
		},
		{
			client: "Tourism NI",
			title: "Building the Hub for Northern Irish tourism",
			abstract:
				"Give your business better access to online sales channels at lower commission rates, so you can promote your offering cost-effectively and drive more direct bookings.",
			link: "/projects/tni-thehub",
			image:
				"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Funesco.org.uk%2Fwp-content%2Fuploads%2F2020%2F06%2Fgiantscauseway4.jpg&f=1&nofb=1",
		},
		{
			client: "ERM",
			title: "Something something environment",
			link: "/projects/erm-2020",
			image:
				"https://images.prismic.io/matthewwatt/5d9e69f2-fa19-4336-a9b1-650909290bd2_grass-close-up-header.jpg",
		},
		{
			client: "Lucid Houses",
			title: "Something something renewable energy",
			link: "/projects/lucid",
			image:
				"https://images.prismic.io/matthewwatt/b0b093fb-f34a-46b0-9f96-daf3f25e3b2f_Lucid_House_Master_4K_OVERLAYS+2.jpg",
		},
	];

	let autoplaySpeed = 8000;
	let direction = 0;
	let current = 0;
	$: article = articles[current];

	let decrement = () => {
		direction = -1;
		current = current === 0 ? articles.length - 1 : current - 1;
		clearInterval(interval);
		interval = setInterval(increment, autoplaySpeed);
	};

	let increment = () => {
		direction = 1;
		current = current === articles.length - 1 ? 0 : current + 1;
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
	{#each articles as { image }}
		<link rel="preload" as="image" href={image} />
	{/each}
</svelte:head>

<section class="my-20">
	<div class="container">
		<div class="flex items-center w-full mb-4 h-[1em] w-full relative">
			<span class="w-24 max-w-full bg-pink h-[1em]" />
			{#key article}
				<p
					in:fade={{ delay: 200, duration: 800, easing: expoOut }}
					out:fade={{ duration: 800, delay: 0, easing: expoOut }}
					class="text-xl text-pink font-bold uppercase flex-1 absolute left-26"
				>
					{article.client}
				</p>
			{/key}
		</div>
		<div class="text-6xl h-[2em]">
			{#key article}
				<h1
					in:fly={{ y: 16 * direction, delay: 200, duration: 800, easing: expoOut }}
					out:fly={{ y: -16 * direction, duration: 800, delay: 0, easing: expoOut }}
					class="text-sky-800 font-bold uppercase w-3xl max-w-full absolute"
				>
					{article.title}
				</h1>
			{/key}
		</div>
		<div class="text-xl h-[2em] mt-4">
			{#key article}
				<h1
					in:fly={{ y: 16 * direction, delay: 200, duration: 800, easing: expoOut }}
					out:fly={{ y: -16 * direction, duration: 800, delay: 0, easing: expoOut }}
					class="text-sky-700 w-3xl max-w-full absolute"
				>
					{article.abstract}
				</h1>
			{/key}
		</div>
	</div>
	<div class="2xl:w-[77rem] max-w-full h-lg flex 2xl:container mt-10">
		<div class="relative flex-1 2xl:-ml-60 overflow-hidden">
			{#key article}
				<img
					in:scale={{ delay: 0, duration: 1000, start: 1.2, easing: expoOut }}
					out:fade={{ duration: 0, delay: 1100 }}
					draggable={false}
					class="object-cover h-full w-full absolute left-0 top-0 select-none"
					src={article.image}
					alt=""
				/>
			{/key}
		</div>
		<div class="w-64 flex flex-col flex-shrink-0">
			<a
				sveltekit:prefetch
				href={article.link}
				class="bg-pink flex-1 flex items-center justify-center text-white transition-colors hover:bg-pink-800 active:bg-pink-900"
			>
				<IconSearch width="5rem" height="5rem" />
			</a>
			<div class="flex">
				<div
					type="button"
					on:click={decrement}
					class="w-1/2 aspect-square bg-pink-600 flex items-center justify-center text-white transition-colors group hover:bg-pink-800 active:bg-pink-900"
				>
					<IconArrowUp
						class="transition-transform transform group-hover:-translate-y-1"
						width="3.25rem"
						height="3.25rem"
					/>
				</div>
				<div
					type="button"
					on:click={increment}
					class="w-1/2 aspect-square bg-pink-700 flex items-center justify-center text-white transition-colors group hover:bg-pink-800 active:bg-pink-900"
				>
					<IconArrowDown
						class="transition-transform transform group-hover:translate-y-1"
						width="3.25rem"
						height="3.25rem"
					/>
				</div>
			</div>
		</div>

		<div
			class="ml-5 grid gap-5"
			style="grid-template-rows: repeat({articles.length}, minmax(0, 1fr))"
		>
			{#each articles as _, i}
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
	<div class="container mt-5">
		<a
			sveltekit:prefetch
			href="/projects"
			class="text-pink text-xl inline-flex items-center font-bold uppercase hover:text-pink-700 group"
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
