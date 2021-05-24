<script context="module">
  import api from "$lib/util/api";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ page }) => {
    return {
      props: {
        key: page.path,
      },
    };
  };
</script>

<script>
  import "$lib/scss/_grid.scss";
  import "$lib/scss/_typography.scss";
  import "$lib/scss/_buttons.scss";
  import "$lib/scss/_globals.scss";

  import Navbar from "$lib/components/navbar.svelte";
  import Footer from "$lib/components/footer.svelte";
  import { fly } from "svelte/transition";

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
</svelte:head>

<Navbar />
{#key key}
  <main in:fly={{ y: -10, duration: 250, delay: 250 }} out:fly={{ y: -10, duration: 250 }}>
    <slot />
  </main>
{/key}
<Footer />
