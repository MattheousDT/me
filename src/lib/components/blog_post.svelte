<script lang="ts">
  import blogDate from "$lib/util/blog_date";

  export let uid: string;
  export let title: string;
  export let date: Date;
  export let abstract: string;
  export let thumb: string;
  export let tags: string[];
</script>

<a href="/blog/{uid}">
  <article>
    <img src={thumb} alt="" />
    <div>
      <h6 class="color--accent">
        {blogDate(date)}
      </h6>
      <h4>{title}</h4>
      <p>{abstract}</p>
      {#each tags as tag}
        <span class="tag">#{tag}</span>
      {/each}
    </div>
  </article>
</a>

<style lang="scss">
  @import "../scss/mixins";

  a {
    text-decoration: none;
  }

  article {
    position: relative;
    margin-bottom: 60px;
    transition: transform 250ms ease;

    @include media-down(sm) {
      margin-bottom: 30px;
    }
  }

  img {
    position: absolute;
    width: 33%;
    height: 241px;
    object-fit: cover;
    border-radius: 20px;
    top: -30px;
    right: 0px;
    z-index: 1;

    @include media-down(sm) {
      display: none;
    }
  }

  div {
    background: var(--card);
    border-radius: 20px;
    padding: 30px 33% 30px 30px;
    width: calc(100% - 30px);
    transition: box-shadow 250ms ease;

    @include media-down(md) {
      padding: 20px 33% 20px 20px;
    }

    @include media-down(sm) {
      padding: 20px;
      width: 100%;
    }
  }

  h6,
  h4 {
    margin: 0;
    transition: color 250ms ease;
  }

  h4 {
    @include media-down(md) {
      font-size: 1.5rem;
    }
  }

  .tag {
    color: var(--subtext);
    margin-right: 5px;
    font-size: 0.9rem;
  }

  a:hover,
  a:focus {
    outline: none;

    article {
      transform: translateY(-8px);
    }
    div {
      box-shadow: 0px 10px 15px -8px rgba(0, 0, 0, 0.49);
    }
  }

  a:focus {
    div {
      box-shadow: 0px 0px 0px 3px var(--accent), 0px 10px 15px -8px rgba(0, 0, 0, 0.49);
    }
  }
</style>
