<script context="module">
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
  import { fly } from "svelte/transition";
  import Prismic from "@prismicio/client";
  import api from "$lib/util/api";
  import type ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
  import { projectTypeToString } from "$lib/util/transfomers";
  import { ProjectType } from "$lib/util/transfomers";
  import Project from "$lib/components/project.svelte";
  import Multiselect from "$lib/components/forms/multiselect.svelte";
  import { browser } from "$app/env";
  import Search from "$lib/components/forms/search.svelte";
  import ProjectSkeleton from "$lib/components/project_skeleton.svelte";

  export let query: ApiSearchResponse;

  let promiseResults: Promise<ApiSearchResponse> = null;

  $: {
    promiseResults = api.query(
      [
        Prismic.Predicates.at("document.type", "project"),
        Prismic.Predicates.any("my.project.type", types),
        searchValue && Prismic.Predicates.fulltext("document", searchValue),
      ],
      {
        fetch: ["project.title", "project.type", "project.thumb"],
        orderings: "[my.project.date desc]",
        pageSize: 12,
      }
    );
  }

  let types = [];
  let searchValue = "";
  let liveSearchValue = "";

  function resetFilters() {
    liveSearchValue = "";
    searchValue = "";
    types = [];
  }
</script>

<svelte:head>
  <title>Projects | Matthew Watt</title>
</svelte:head>

<header>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Projects</h1>
        <p>
          {searchValue} Vel mauris turpis elit tristique cursus. Phasellus nunc purus massa consectetur
          lacus risus. Nisi, amet, viverra sagittis, proin ultrices nibh.
        </p>

        <div class="filters">
          <Search bind:value={liveSearchValue} bind:searchValue />
          <Multiselect
            options={[
              { friendly: "Web Development", value: ProjectType.web },
              { friendly: "UI/UX Design", value: ProjectType.design },
              { friendly: "Music Production", value: ProjectType.music },
            ]}
            bind:selected={types}
          />
          <button
            on:click={resetFilters}
            class="button"
            disabled={types.length == 0 && searchValue === ""}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
<img class="swoosh" src="/svg/project_listing_swoosh.svg" alt="" />

<div class="container">
  <div class="row">
    {#await promiseResults then value}
      {#each value.results as doc, i}
        <div in:fly={{ y: 20, duration: 250, delay: i * 50 }} class="col-12 col-md-6 col-xl-4">
          <Project
            thumb={doc.data.thumb.url}
            title={doc.data.title}
            type={projectTypeToString(ProjectType[doc.data.type])}
            uid={doc.uid}
          />
        </div>
      {/each}

      {#if value.results_size === 0}
        <div class="col-12">
          <h4 class="error-text">No results found :(</h4>
        </div>
      {/if}
    {:catch error}
      <div class="col-12">
        <h4 class="error-text">There was an error... Please try again later.</h4>
      </div>
    {/await}

    <!-- Server Rendered Results -->
    {#if !browser}
      {#each query.results as doc}
        <div class="col-4" style="display: none;">
          <Project
            thumb={doc.data.thumb.url}
            title={doc.data.title}
            type={projectTypeToString(ProjectType[doc.data.type])}
            uid={doc.uid}
          />
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../lib/scss/mixins";

  header {
    padding: 112px 0 60px;

    @include media-down(md) {
      padding: 60px 0;
    }

    p {
      max-width: 714px;
    }
  }

  h1 {
    margin: 0 0 20px;
  }

  .swoosh {
    pointer-events: none;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 551px;
    object-fit: cover;
    object-position: left;

    @media (min-width: 1920px) {
      object-fit: cover;
      height: auto !important;
      object-position: center;
    }
  }

  .filters {
    display: flex;
    margin: 0 -10px;
    :global > * {
      margin-left: 10px;
      margin-right: 10px;

      @include media-down(lg) {
        flex: 2;
      }
    }

    button {
      @include media-down(lg) {
        flex: 1;
      }
    }

    @include media-down(sm) {
      flex-direction: column;
      margin: 0;

      :global > * {
        max-width: none !important;
        width: 100%;
        margin: 0 0 20px;
      }
    }
  }

  .error-text {
    text-align: center;
  }
</style>
