<script lang="ts">
  import { enhance } from "$lib/util/form";
  import { onMount } from "svelte";
  import { draw, fly } from "svelte/transition";
  import { expoOut } from "svelte/easing";

  let bruh = false;

  onMount(() => {
    bruh = true;
  });
</script>

<button
  on:click={() => {
    bruh = false;
    setTimeout(() => (bruh = true), 100);
  }}>reset</button
>
{#if bruh}
  <svg
    width="182"
    height="182"
    viewBox="0 0 182 182"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      in:draw={{ duration: 1000, easing: expoOut }}
      d="M28.0675 28.0675C62.8242 -6.68917 119.176 -6.68917 153.932 28.0675C188.689 62.8242 188.689 119.176 153.932 153.932C119.176 188.689 62.8242 188.689 28.0675 153.932C-6.68917 119.176 -6.68917 62.8242 28.0675 28.0675Z"
      stroke="#1BF2C2"
      stroke-width="4"
      stroke-linecap="round"
    />
    <path
      in:fly={{ x: -30, y: 30, duration: 800, delay: 400, easing: expoOut }}
      d="M121.062 54.6217L56.3124 91.9686C52.9882 93.8908 53.3206 98.7905 56.8616 100.25L77.1249 108.633V123.375C77.1249 127.74 82.5882 129.633 85.3198 126.309L94.0929 115.643L112.362 123.187C115.122 124.329 118.244 122.58 118.692 119.617L127.942 59.3334C128.535 55.4744 124.387 52.6994 121.062 54.6217ZM81.7499 123.375V110.541L89.6269 113.793L81.7499 123.375ZM114.125 118.909L84.3226 106.595L113.157 72.5147C113.85 71.7053 112.737 70.6069 111.928 71.3006L75.0292 102.751L58.6249 95.9865L123.375 58.6252L114.125 118.909Z"
      fill="#1BF2C2"
    />
  </svg>

  <h5 in:fly={{ y: 30, duration: 500, delay: 700, easing: expoOut }} class="color--accent">
    Message Sent
  </h5>
{/if}

<form action="/api/contact" method="POST">
  <!--   use:enhance={{
    result: async (res, form) => {
      alert("yay");
    },
  }}<div class="input">
    <label for="name">Name</label>
    <input name="name" id="name" type="text" required />
  </div>
  <div class="input">
    <label for="email">Email</label>
    <input name="email" id="email" type="email" required />
  </div>
  <div class="input">
    <label for="text">Text</label>
    <textarea name="query" id="text" required />
  </div>
  <button class="button" type="submit">Send</button> -->
</form>
