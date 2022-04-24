<script lang="ts">
	const clients: Record<string, [string, string]> = {
		tni: ["Tourism Northern Ireland", "https://tourismni.com"],
		erm: ["Environmental Resources Management", "https://erm.com"],
		lucid: ["Lucid", "https://lucid.house"],
		ptsb: ["Permanent TSB", "https://www.permanenttsb.ie/"],
		hop: ["Houses of Parliament", "https://www.parliament.uk/"],
		enersys: ["Enersys", "https://enersys.com"],
		falni: ["Forum for Adult Learning Northern Ireland", "https://falni.org"],
		mp: ["Mortgage Propeller", "https://mortgagepropeller.com"],
		eason: ["Eason & Sons", "https://eason.com"],
		feinwaru: ["Feinwaru Software", "https://feinwaru.com"],
	};
</script>

<section class="py-20">
	<div class="container">
		<h2 class="font-medium text-xl text-center text-sky-700 mb-8">
			I've previously worked with some pretty cool brands...
		</h2>
		<div
			class="grid gap-x-4 gap-y-10 justify-center mx-auto w-5xl max-w-full grid-cols-3 lg:grid-cols-5"
		>
			{#each Object.entries(clients) as [code, [name, url]]}
				<a href={url} target="_blank">
					<img src="/svg/clients/client-{code}.svg" alt={name} class="w-full h-full" height={86} />
				</a>
			{/each}
		</div>
	</div>
</section>
