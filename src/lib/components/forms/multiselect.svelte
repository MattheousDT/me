<script>
  import { slide } from "svelte/transition";
  import { expoOut } from "svelte/easing";

  let expanded = false;

  export let options: { friendly: string; value: any }[];
  export let selected = [];
</script>

<div class="dropdown-container">
  <button on:click={() => (expanded = !expanded)} class="button">
    <span>
      {selected.length === 0
        ? "Project Type"
        : selected.map((e) => options.find((x) => x.value == e).friendly).join(", ")}
    </span>
    <svg
      class="arrow"
      class:flip={expanded}
      width="22"
      height="13"
      viewBox="0 0 22 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2L11 11L20 2"
        stroke="#1BF2C2"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  {#if expanded}
    <div class="exit-handler" on:click|self={() => (expanded = false)} />
    <div transition:slide={{ duration: 500, easing: expoOut }} class="dropdown">
      {#each options as { friendly, value }}
        <div class="input">
          <input id={value} {value} type="checkbox" bind:group={selected} />
          <label for={value}>{friendly}</label>
          {#if selected.includes(value)}
            <svg
              class="check"
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5L4.5 8L11 1"
                stroke="#1BF2C2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .dropdown-container {
    position: relative;
    display: inline-block;
    max-width: 338px;
    width: 100%;
  }

  button {
    width: 100%;
    border-color: var(--card);
    background: var(--card);
    color: var(--text);
    text-align: left;
    font-weight: 400;

    span {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      padding-right: 30px;
      margin: -5px 0 -6px;
    }

    .arrow {
      position: absolute;
      right: 20px;
      top: 22px;
      pointer-events: none;
      transition: transform 250ms ease;

      &.flip {
        transform: rotate(180deg);
      }
    }

    &:hover,
    &:focus {
      color: var(--text) !important;
    }
  }

  .exit-handler {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    cursor: default;
  }

  .dropdown {
    position: absolute;
    z-index: 999;
    background: var(--card);
    width: 100%;
    bottom: -15px;
    transform: translateY(100%);
    border-radius: 10px;
    box-shadow: 0px 0px 16px -3px rgba(0, 0, 0, 0.44);
    padding: 20px;
  }

  .input {
    position: relative;
    margin-bottom: 5px;
  }

  label {
    user-select: none;
    margin-left: 40px;
    transition: color 250ms ease;
    cursor: pointer;

    // Box
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 3px;
      height: 22px;
      width: 22px;
      border: 2px solid var(--accent);
      border-radius: 5px;
    }
  }

  input {
    position: absolute;
    left: -100vw;

    &:checked + label {
      color: var(--accent);
    }
  }

  @keyframes checked {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  .check {
    position: absolute;
    left: 5px;
    top: 9px;
    pointer-events: none;
    animation: checked 250ms cubic-bezier(0.26, 1.29, 0.7, 1.18);
  }
</style>
