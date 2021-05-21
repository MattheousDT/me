<script context="module">
  import Prismic from "@prismicio/client";
  import api from "$lib/util/api";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ page }) => {
    let query = await api.query(Prismic.Predicates.at("document.type", "project"), {
      orderings: "[my.project.date desc]",
    });

    return {
      props: {
        query,
      },
    };
  };
</script>

<script>
  import type ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
  import ArrowButton from "$lib/components/buttons/arrow_button.svelte";
  import type { IProject } from "$lib/util/transfomers";
  import { ProjectType } from "$lib/util/transfomers";
  import { prismicToProject } from "$lib/util/transfomers";
  import Project from "$lib/components/project.svelte";

  export let query: ApiSearchResponse;
  let data = query.results.map((e) => prismicToProject(e));
</script>

<svelte:head>
  <title>Projects | Matthew Watt</title>
</svelte:head>

<div class="container">
  <div class="row">
    {#each data as project}
      <div class="col-4">
        <Project {project} />
      </div>
    {/each}
  </div>
</div>
