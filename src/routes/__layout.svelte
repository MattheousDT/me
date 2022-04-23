<script lang="ts" context="module">
	import Footer from "$lib/components/footer.svelte";
	import Navbar from "$lib/components/navbar.svelte";
	import type { Load } from "@sveltejs/kit";
	import { fly, scale } from "svelte/transition";
	import { expoOut } from "svelte/easing";
	import "virtual:windi.css";

	export const load: Load = async ({ url }) => {
		return {
			props: {
				key: url.pathname,
			},
		};
	};
</script>

<script lang="ts">
	export let key: string;

	let keywords = "JavaScript, CSS, front-end, web design";
	let img = "https://matthewwatt.co.uk/logo.png";
</script>

<svelte:head>
	<meta name="keywords" content={keywords} />
	<meta name="content" content={keywords} />
	<meta name="property" content={keywords} />

	<meta property="og:image" content={img} />
	<meta name="twitter:image" content={img} />
	<meta name="twitter:card" content="summary" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Open+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Pragati+Narrow:wght@700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar />
{#key key}
	<main
		in:fly={{ x: 10, delay: 600, duration: 500, easing: expoOut }}
		out:fly={{ x: -10, delay: 0, duration: 500, easing: expoOut }}
	>
		<slot />
	</main>
{/key}
<Footer />

<style lang="scss" global>
	body {
		overflow-y: scroll;
		overflow-x: hidden;
	}
</style>
