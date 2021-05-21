<script context="module">
  import Prismic from "@prismicio/client";
  import api from "$lib/util/api";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ page }) => {
    let query = await api.query(Prismic.Predicates.at("document.type", "project"), {
      fetch: ["project.title", "project.type", "project.thumb"],
      orderings: "[my.project.date desc]",
      pageSize: 12,
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
  import { projectTypeToString } from "$lib/util/transfomers";
  import { ProjectType } from "$lib/util/transfomers";
  import Project from "$lib/components/project.svelte";

  export let query: ApiSearchResponse;
</script>

<svelte:head>
  <title>Projects | Matthew Watt</title>
</svelte:head>

<div class="container">
  <div class="row">
    {#each query.results as doc}
      <div class="col-4">
        <Project
          thumb={doc.data.thumb.url}
          title={doc.data.title}
          type={projectTypeToString(ProjectType[doc.data.type])}
          uid={doc.uid}
        />
      </div>
    {/each}
  </div>
</div>
