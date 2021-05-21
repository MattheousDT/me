<script>
  export let flip = false;
</script>

{#if $$props.href}
  <a href={$$props.href} on:click class:flip>
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.19 2L2 10M2 10L10.19 18M2 10H20"
        stroke="var(--accent)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </a>
{:else}
  <button on:click class:flip>
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.19 2L2 10M2 10L10.19 18M2 10H20"
        stroke="var(--accent)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
{/if}

<style lang="scss">
  a,
  button {
    display: flex;
    border-radius: 50%;
    border: none;
    align-items: center;
    justify-content: center;
    background: var(--accent-trans);
    width: 44px;
    height: 44px;
    cursor: pointer;
    transition: background 150ms ease;

    &:hover,
    &:focus {
      outline: none;
      background: var(--accent);

      path {
        stroke: var(--background);
      }
    }

    path {
      transition: stroke 150ms ease;
    }

    &.flip {
      transform: rotate(180deg);
    }
  }
</style>
