<script context="module">
  import api from "$lib/util/api";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ page }) => {
    let query = await api.getByUID("blog_post", page.params.uid, {});

    if (!query) {
      return {
        error: "Page not found :(",
        status: 404,
      };
    }

    console.log(query);

    return {
      props: {
        doc: query,
      },
    };
  };
</script>

<script>
  import type { Document } from "@prismicio/client/types/documents";
  import linkResolver from "$lib/util/linkResolver";
  import htmlSerializer from "$lib/util/htmlSerializer";
  import PrismicDOM from "prismic-dom";
  import length from "$lib/util/length";
  import ArrowButton from "$lib/components/buttons/arrow_button.svelte";

  export let doc: Document;
</script>

<svelte:head>
  <title>{doc.data.title[0].text} | Matthew Watt</title>

  <meta property="og:title" content={doc.data.title[0].text} />
  <meta property="og:description" content={doc.data.description} />
  <meta property="og:image" content={doc.data.featured_image.meta.url} />
  <meta property="og:url" content="https://matthewwatt.co.uk/blog/{doc.uid}" />
  <meta property="og:site_name" content="Matthew Watt" />

  <meta name="twitter:title" content={doc.data.title[0].text} />
  <meta name="twitter:description" content={doc.data.description} />
  <meta name="twitter:image" content={doc.data.featured_image.meta.url} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image:alt" content={doc.data.featured_image.alt} />
</svelte:head>

<header>
  <img src={doc.data.featured_image.banner.url} alt="" class="background-image" />
  <div class="container">
    <div class="row">
      <div class="col-12">
        <ArrowButton href="/blog" />
        <h5 class="color--accent">
          <time datetime={new Date(doc.data.date).toISOString()}>
            {new Date(doc.data.date).toLocaleDateString("en-GB", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </time>
          · {length(doc.data.text.reduce((a, b) => a + b.text, ""))}
        </h5>
        <h1>{doc.data.title[0].text}</h1>
      </div>
    </div>
  </div>
</header>

<div class="container">
  <div class="row">
    <div class="col-12">
      <div class="html">
        {@html PrismicDOM.RichText.asHtml(doc.data.text, linkResolver, htmlSerializer)}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  header {
    position: relative;
    padding: calc(40px + var(--nav-height)) 0 120px;
    margin-bottom: 60px;
    margin-top: calc(0px - var(--nav-height));

    img {
      z-index: -1;
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
      top: 0;
      left: 0;
      opacity: 0.3;
    }

    h5 {
      margin: 40px 0 0;
    }

    time {
      all: inherit;
      display: inline;
    }

    h1 {
      font-size: 3.157rem;
      max-width: 1016px;
      margin: 0;
    }
  }

  :global .html {
    margin-bottom: 120px;

    > :not(.full-width) {
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;
    }

    .full-width {
      margin: 40px 0;
    }

    img {
      position: relative;
      border-radius: 20px;
      width: 100%;
    }

    figcaption {
      margin: 0 30px;
      font-style: italic;
    }

    strong {
      font-weight: 800;
    }

    h3,
    h4,
    a {
      color: var(--accent);
    }

    blockquote {
      color: var(--accent);
      text-decoration: none;
      padding: 20px 30px;
      border-radius: 20px;
      border: 2px solid var(--accent);
      background: transparent;
    }
  }
</style>
