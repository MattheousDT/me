<script lang="ts">
	import { page } from "$app/stores";
	import { expoOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 10000),
		easing: expoOut,
	});

	const links = {
		Home: "/",
		Projects: "/projects",
		Writing: "/writing",
		Contact: "/contact",
	};
</script>

<nav class="h-[5.625rem] flex items-center z-50 container">
	<div class="flex justify-between items-center border-b border-sky-100 h-full w-full py-5">
		<a class="h-full" href="/">
			<img src="/svg/logo.svg" alt="Go home" />
		</a>
		<ul class="-mx-5 p-0 flex" role="menubar" aria-label="Main navigation menu">
			{#each Object.entries(links) as [title, link]}
				{@const isActive =
					link === "/" ? $page.url.pathname === link : $page.url.pathname.startsWith(link)}
				<li role="none" class="relative">
					<a
						class="relative mx-5 no-underline uppercase transition-colors text-lg font-bold font-heading"
						role="menuitem"
						class:text-sky-800={isActive}
						class:text-sky-300={!isActive}
						href={link}
					>
						{title}
					</a>
					{#if isActive}
						<span
							class="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-2 h-2 bg-pink"
							in:receive={{ key: "indicator" }}
							out:send={{ key: "indicator" }}
						/>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</nav>
