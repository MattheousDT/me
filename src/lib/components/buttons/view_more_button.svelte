<script>
  export let text = "Load more";
  export let marginTop = false;
</script>

{#if $$props.href}
  <a href={$$props.href} on:click class:marginTop>
    <span>{text}</span>
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
{/if}

<style lang="scss">
  a {
    position: relative;
    display: flex;
    border-radius: 50%;
    border: none;
    align-items: center;
    justify-content: center;
    padding: 0 25px;
    height: 50px;
    cursor: pointer;
    text-decoration: none;
    margin: 0 auto 120px;

    &.marginTop {
      margin-top: 30px;
    }

    span {
      font-weight: 800;
      color: var(--accent);
      transition: color 250ms ease;
      transform: translateY(1px);
    }

    // circle
    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      height: 50px;
      width: 50px;
      border-radius: 25px;
      background: var(--accent-trans);
      transition: background 250ms ease, width 250ms ease;
    }

    &:hover,
    &:focus {
      span {
        color: var(--background);
      }

      path {
        stroke: var(--background);
      }

      &::before {
        width: 100%;
        background: var(--accent);
        transition: background 250ms ease, width 250ms cubic-bezier(0.26, 1.29, 0.7, 1.18);
      }
    }

    svg {
      transform: rotate(180deg);
      margin-left: 15px;

      path {
        transition: stroke 250ms ease;
      }
    }
  }
</style>
