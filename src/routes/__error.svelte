<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = ({ status, error }) => {
    return {
      props: {
        status,
        error: error?.message,
      },
    };
  };
</script>

<script lang="ts">
  export let status: number;
  export let error: string;
</script>

<div class="container">
  <div class="row">
    <div class="col-12">
      <div class="content">
        <h1>{status}</h1>
        <h3>{error}</h3>
        <a class="button" href="/">Back to home</a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "../lib/scss/mixins";

  @include media-up(md) {
    .col-12 {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
