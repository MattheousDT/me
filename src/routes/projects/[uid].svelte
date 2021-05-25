<script context="module">
  import Prismic from "@prismicio/client";
  import api from "$lib/util/api";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ page }) => {
    let query = await api.getByUID("project", page.params.uid, {});

    if (!query) {
      return {
        error: "Page not found :(",
        status: 404,
      };
    }

    let next = await api.queryFirst(
      Prismic.predicates.dateBefore("my.project.date", new Date(query.data.date)),
      {
        fetch: "project.title",
        orderings: "[my.project.date desc]",
      }
    );

    return {
      props: {
        data: prismicToProject(query),
        next: next
          ? {
              uid: next.uid,
              title: next.data.title,
            }
          : null,
      },
    };
  };
</script>

<script>
  import AudioPlayer from "$lib/components/audio_player.svelte";
  import ArrowButton from "$lib/components/buttons/arrow_button.svelte";
  import type { IProject } from "$lib/util/transfomers";
  import { projectTypeToString } from "$lib/util/transfomers";
  import { prismicToProject } from "$lib/util/transfomers";

  export let data: IProject;
  export let next: { uid: string; title: string };
</script>

<svelte:head>
  <title>{data.title} | Matthew Watt</title>
</svelte:head>

<header>
  <div class="container">
    <div class="row">
      <div class="col-lg-7 col-xl-6">
        <ArrowButton href="/projects" />
        {#if data.logo}
          <img class="logo" src={data.logo} alt={data.title} />
        {:else}
          <h1>{data.title}</h1>
        {/if}
        <div class="space-between">
          <h5 class="color--accent">{projectTypeToString(data.type)}</h5>
          {#if data.link}
            <a href={data.link} class="button button--outline" target="_blank" rel="noreferrer">
              View Project
            </a>
          {/if}
        </div>
        <p class="description">{data.description}</p>
        <div class="row stats">
          {#each data.stats as { title, body }}
            <div class="col-{12 / data.stats.length} stat">
              <h6 class="color--accent">{title}</h6>
              <p>{@html body.replace(/\n/g, "<br>")}</p>
            </div>
          {/each}
        </div>
      </div>
      <div class="col-lg-4 col-xl-6 next-project-col">
        {#if next}
          <a href="/projects/{next.uid}" class="next-project">
            <div class="text">
              <p class="color--accent">Next Project</p>
              <h5>{next.title}</h5>
            </div>
            <ArrowButton wrapped flip />
          </a>
        {/if}
      </div>
    </div>
  </div>
</header>
<img class="swoosh" src="/svg/project_swoosh.svg" alt="" />
{#if data.images && data.images.length > 0}
  <div class="container">
    <div class="images">
      {#each data.images as { url, alt }, i}
        <img style="margin-top: {i === data.marginIndex ? '175px' : '0px'}" src={url} {alt} />
      {/each}
    </div>
  </div>
{/if}

{#if data.audio && data.audio.length > 0}
  <div class="container">
    <div class="row">
      <div class="col-12">
        <AudioPlayer albumArt={data.thumb} audio={data.audio} />
      </div>
    </div>
  </div>
{/if}

<img class="swoosh footer" src="/svg/footer_swoosh.svg" alt="" />

<style lang="scss">
  @import "../../lib/scss/mixins";

  header {
    padding-top: 40px;

    .row {
      justify-content: space-between;

      @include media-down(md) {
        justify-content: flex-end;
      }
    }
  }

  .logo {
    max-height: 140px;
    max-width: 100%;
    height: auto;
    margin: 40px 0 10px;
  }

  h1 {
    margin: 40px 0 10px;
  }

  .space-between {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    h5 {
      margin-bottom: 0;
    }

    @include media-down(xs) {
      flex-direction: column;
      align-items: flex-start;

      h5 {
        margin-bottom: 30px;
      }
    }
  }

  .description {
    margin-bottom: 35px;
  }

  .stats {
    @include media-down(sm) {
      margin-bottom: 20px;
    }
  }

  .stat {
    h6 {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -15px;
        height: 2px;
        width: 30px;
        border-radius: 10px;
        background: var(--accent);
      }
    }
  }

  .next-project-col {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    padding-bottom: 30px;
  }

  .next-project {
    display: flex;
    align-items: center;
    text-decoration: none;
    text-align: right;

    * {
      margin: 0;
    }

    .text {
      max-width: 300px;
      margin-right: 15px;
    }
  }

  .swoosh {
    pointer-events: none;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 551px;
    object-fit: cover;
    object-position: right;
    user-select: none;

    &.footer {
      height: 150px;
      bottom: 0;
    }

    @media (min-width: 1920px) {
      object-fit: cover;
      height: auto !important;
      object-position: center;
    }
  }

  .images {
    margin: 140px 0 0;
    column-count: 2;
    gap: 30px;

    img {
      width: 100%;
      margin-bottom: 25px;
      box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.3);
    }
  }
</style>
