<script>
  import { scale } from "svelte/transition";

  export let paused: boolean;
</script>

<button name={paused ? "Play" : "Pause"} on:click>
  {#if paused}
    <svg
      class="paused"
      width="23"
      height="32"
      viewBox="0 0 23 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 16L2 30L2 2L21 16Z"
        stroke="#1BF2C2"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {:else}
    <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3V27" stroke="#1BF2C2" stroke-width="3" stroke-linecap="round" />
      <path d="M15 3V27" stroke="#1BF2C2" stroke-width="3" stroke-linecap="round" />
    </svg>
  {/if}
</button>

<style lang="scss">
  button {
    display: flex;
    border-radius: 50%;
    border: none;
    align-items: center;
    justify-content: center;
    background: var(--accent-trans);
    width: 60px;
    height: 60px;
    cursor: pointer;
    transition: background 150ms ease;
    user-select: none;

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

    .paused {
      transform: translateX(4px);
    }
  }
</style>
