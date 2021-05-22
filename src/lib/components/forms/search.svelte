<script>
  export let searchValue: string;

  export let value: string;

  function submit() {
    searchValue = value;
  }

  function clear() {
    value = "";
    searchValue = "";
  }
</script>

<div class="search">
  <form on:submit|preventDefault={submit}>
    <input on:blur={submit} type="search" bind:value />
  </form>

  {#if value}
    <!-- Clear icon -->
    <svg
      on:click={clear}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="transform: translateY(2px)"
    >
      <path
        d="M1.87891 1.87869L15.0002 15"
        stroke="#1BF2C2"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.0002 1.87869L1.87891 15"
        stroke="#1BF2C2"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {:else}
    <!-- Search icon -->
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="pointer-events: none;"
    >
      <path
        d="M16.5 17.5L18 19M11.9183 14.5564C11.1663 14.9983 10.3362 15.285 9.4753 15.4004C8.6144 15.5157 7.7396 15.4574 6.90086 15.2287C6.06211 14.9999 5.27585 14.6054 4.58696 14.0674C3.89807 13.5295 3.32004 12.8587 2.88587 12.0935C2.45171 11.3282 2.16991 10.4834 2.05657 9.60728C1.94323 8.73118 2.00057 7.84094 2.22531 6.98738C2.45005 6.13383 2.83779 5.33369 3.3664 4.63263C3.895 3.93158 4.55412 3.34334 5.30612 2.90151C6.05811 2.45968 6.88826 2.17291 7.74916 2.05757C8.61006 1.94223 9.48486 2.00058 10.3236 2.22928C11.1623 2.45799 11.9486 2.85258 12.6375 3.39052C13.3264 3.92846 13.9044 4.59921 14.3386 5.36449C14.7728 6.12976 15.0545 6.97456 15.1679 7.85066C15.2812 8.72677 15.2239 9.61701 14.9991 10.4706C14.7744 11.3241 14.3867 12.1243 13.8581 12.8253C13.3295 13.5264 12.6703 14.1146 11.9183 14.5564Z"
        stroke="#1BF2C2"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {/if}
</div>

<style lang="scss">
  .search {
    position: relative;
    display: inline-block;
    max-width: 338px;
    width: 100%;
  }

  input {
    color: var(--text);
    text-decoration: none;
    padding: 15px 20px;
    border-radius: 10px;
    border: 2px solid var(--card);
    background: var(--card);
    line-height: 113%;
    width: 100%;
    transition: background 150ms ease, color 250ms ease;
    appearance: none;
    padding-right: 50px;

    &::-ms-clear {
      display: none;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }

    &:hover,
    &:focus {
      outline: none;
    }
  }

  svg {
    position: absolute;
    right: 20px;
    top: 17px;
  }
</style>
