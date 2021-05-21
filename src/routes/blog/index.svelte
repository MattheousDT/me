<script context="module">
  import Prismic from "@prismicio/client";
  import api from "$lib/util/api";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ page }) => {
    let query = await api.query(Prismic.Predicates.at("my.blog_post.public", true), {
      fetch: ["blog_post.title", "blog_post.date", "blog_post.featured_image"],
      orderings: "[my.blog_post.date desc]",
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
          thumb={doc.data.featured_image.thumbnail.url}
          title={doc.data.title[0].text}
          type={new Date(doc.data.date).toLocaleDateString("en-GB", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
          uid={doc.uid}
          forwardSlash={"blog"}
        />
      </div>
    {/each}
  </div>
</div>
