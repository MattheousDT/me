<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let amount = 4;
  export let startingHeight = 16;
  export let speed = 400;

  let items: number[] = Array(amount).fill(startingHeight);

  const randomIntFromInterval = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const updateHeightsInterval = setInterval(
    () => (items = items.map(() => randomIntFromInterval(3, 16))),
    speed
  );

  onMount(() => {
    updateHeightsInterval;
  });

  onDestroy(() => {
    clearInterval(updateHeightsInterval);
  });
</script>

<div class="waveform">
  {#each items as i}
    <span class="wave" style="height: {i}px; transition: height {speed}ms linear;" />
  {/each}
</div>

<style lang="scss">
  .waveform {
    display: flex;
    align-items: flex-end;
    justify-content: space-evenly;
    width: 20px;
    height: 16px;
  }

  .wave {
    width: 3px;
    height: 200px;
    border-radius: 100px;
    margin: 0 1px;
    background-color: var(--accent);
  }
</style>
