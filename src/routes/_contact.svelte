<script lang="ts" context="module">
</script>

<script lang="ts">
  import ContactForm from "$lib/components/contact_form.svelte";
</script>

<svelte:head>
  <title>Matthew Watt</title>
</svelte:head>

<header>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Contact</h1>
        <p>
          Have a project you want my help on? Maybe you just want to chat?<br />
          Either way, get in touch!
        </p>
      </div>
    </div>
  </div>
</header>
<img class="swoosh" src="/svg/project_swoosh.svg" alt="" />
<ContactForm />

<style lang="scss">
  @import "../lib/scss/mixins";

  header {
    padding: 112px 0 60px;

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
    object-position: center;
    user-select: none;

    @media (min-width: 1920px) {
      object-fit: cover;
      height: auto !important;
      object-position: center;
    }
  }
</style>
