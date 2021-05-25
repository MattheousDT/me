<script context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ page }) => {
    let query = await api.query(Prismic.Predicates.at("my.blog_post.public", true), {
      fetch: [
        "blog_post.title",
        "blog_post.date",
        "blog_post.abstract",
        "blog_post.featured_image",
        "blog_post.tags",
      ],
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
  import { fly } from "svelte/transition";
  import Prismic from "@prismicio/client";
  import api from "$lib/util/api";
  import type ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
  import Multiselect from "$lib/components/forms/multiselect.svelte";
  import { browser } from "$app/env";
  import Search from "$lib/components/forms/search.svelte";
  import BlogPost from "$lib/components/blog_post.svelte";

  export let query: ApiSearchResponse;

  let promiseResults: Promise<ApiSearchResponse> = null;

  $: {
    promiseResults = api.query(
      [
        Prismic.Predicates.at("my.blog_post.public", true),
        //Prismic.Predicates.any("my.project.type", types),
        searchValue && Prismic.Predicates.fulltext("document", searchValue),
      ],
      {
        fetch: [
          "blog_post.title",
          "blog_post.date",
          "blog_post.abstract",
          "blog_post.featured_image",
          "blog_post.tags",
        ],
        orderings: "[my.blog_post.date desc]",
        pageSize: 12,
      }
    );
  }

  let searchValue = "";
  let liveSearchValue = "";

  function resetFilters() {
    liveSearchValue = "";
    searchValue = "";
  }
</script>

<svelte:head>
  <title>Blog | Matthew Watt</title>
</svelte:head>

<header>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Blog</h1>
        <p>
          Personal thoughts and notes I have made on things I found interesting about all things
          technology, music, and life.
        </p>

        <div class="filters">
          <Search bind:value={liveSearchValue} bind:searchValue />
          <!-- <Multiselect
            options={}
            bind:selected={}
          /> -->
          <button on:click={resetFilters} class="button" disabled={searchValue === ""}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</header>
<img class="swoosh" src="/svg/blog_listing_swoosh.svg" alt="" />

<div class="container">
  <div class="row">
    {#await promiseResults then value}
      {#each value.results as doc, i}
        <div in:fly={{ y: 20, duration: 250, delay: i * 50 }} class="col-12">
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
        <div class="col-12" style="display: none;">
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

      {#if query.results_size === 0}
        <div class="col-12">
          <h4 class="error-text">No results found :(</h4>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../lib/scss/mixins";

  header {
    padding: 112px 0 60px;
    margin-bottom: 30px;

    @include media-down(md) {
      padding: 60px 0;
    }

    p {
      max-width: 714px;
      margin-bottom: 60px;
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
    object-position: top;
    user-select: none;

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
        flex: 3;
        max-width: 100%;
        //flex: 1;
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
