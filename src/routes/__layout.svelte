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
</script>

<svelte:head />

<Navbar />
{#key key}
  <main in:fly={{ y: -10, duration: 250, delay: 250 }} out:fly={{ y: -10, duration: 250 }}>
    <slot />
  </main>
{/key}
<Footer />
