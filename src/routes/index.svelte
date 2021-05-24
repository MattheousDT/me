<script context="module">
  import type { Load } from "@sveltejs/kit";
  import Prismic from "@prismicio/client";
  import api from "$lib/util/api";

  export const load: Load = async ({ page }) => {
    let blogQuery = await api.query(Prismic.Predicates.at("my.blog_post.public", true), {
      fetch: [
        "blog_post.title",
        "blog_post.date",
        "blog_post.abstract",
        "blog_post.featured_image",
        "blog_post.tags",
      ],
      orderings: "[my.blog_post.date desc]",
      pageSize: 2,
    });

    let projectQuery = await api.query(
      Prismic.Predicates.at("document.type", "project"),

      {
        fetch: ["project.title", "project.type", "project.thumb"],
        orderings: "[my.project.date desc]",
        pageSize: 6,
      }
    );

    return {
      props: {
        blogQuery,
        projectQuery,
      },
    };
  };
</script>

<script>
  import Clients from "$lib/components/clients.svelte";
  import type ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
  import BlogPost from "$lib/components/blog_post.svelte";
  import Project from "$lib/components/project.svelte";
  import { ProjectType, projectTypeToString } from "$lib/util/transfomers";
  import Jumbotron from "$lib/components/jumbotron.svelte";
  import ViewMoreButton from "$lib/components/buttons/view_more_button.svelte";

  export let blogQuery: ApiSearchResponse;
  export let projectQuery: ApiSearchResponse;
</script>

<svelte:head>
  <title>Matthew Watt</title>
</svelte:head>

<Jumbotron />
<div class="container">
  <div class="row">
    <div class="col-12">
      <h4>Recent Projects</h4>
    </div>
  </div>
  <div class="row">
    {#each projectQuery.results as doc}
      <div class="col-12 col-md-6 col-xl-4">
        <Project
          thumb={doc.data.thumb.url}
          title={doc.data.title}
          type={projectTypeToString(ProjectType[doc.data.type])}
          uid={doc.uid}
        />
      </div>
    {/each}
  </div>
  <div class="row">
    <ViewMoreButton text="View all projects" href="/projects" marginTop />
  </div>
</div>
<div class="container">
  <div class="row">
    <div class="col-12">
      <h4>I've worked with...</h4>
    </div>
  </div>
</div>
<Clients />
{#if blogQuery.results_size > 0}
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h4>My recent ramblings...</h4>
      </div>
    </div>
    <div class="row">
      {#each blogQuery.results as doc}
        <div class="col-12">
          <BlogPost
            uid={doc.uid}
            title={doc.data.title[0].text}
            date={new Date(doc.data.date)}
            abstract={doc.data.abstract}
            thumb={doc.data.featured_image.thumbnail.url}
            tags={doc.data.tags.split(" ")}
          />
        </div>
      {/each}
    </div>
    <div class="row">
      <ViewMoreButton text="View my other articles" href="/blog" />
    </div>
  </div>
{/if}

<style lang="scss">
</style>
