<script>
  import { spring } from "svelte/motion";
  import PlayButton from "./buttons/play_button.svelte";
  import Waveform from "./waveform.svelte";

  export let albumArt: string;
  export let audio: { title: string; url: string }[];

  let selected = audio[0];

  let duration: number,
    currentTime: number,
    paused = true,
    volume = 0.3;

  let percent = spring((currentTime / duration) * 100 || 0, {
    stiffness: 0.3,
    damping: 0.7,
  });

  $: percent.set((currentTime / duration) * 100 || 0);

  function handleMousemove(e: MouseEvent) {
    if (!(e.buttons & 1)) return; // mouse not down
    if (!duration) return; // audio not loaded yet

    const { left, right } = this.getBoundingClientRect();
    currentTime = (duration * (e.clientX - left)) / (right - left);
  }

  function handleMousedown(e: MouseEvent) {
    function handleMouseup() {
      cancel();
    }

    if (!duration) return; // audio not loaded yet

    const { left, right } = this.getBoundingClientRect();
    currentTime = (duration * (e.clientX - left)) / (right - left);

    function cancel() {
      e.target.removeEventListener("mouseup", handleMouseup);
    }

    e.target.addEventListener("mouseup", handleMouseup);

    setTimeout(cancel, 200);
  }

  function format(seconds: number) {
    if (isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    const seconds2 = seconds.toString().padStart(2, "0");

    return `${minutes}:${seconds2}`;
  }
</script>

<audio src={selected.url} bind:duration bind:currentTime bind:paused bind:volume>
  <track kind="captions" />
</audio>

<div class="player">
  <img class="album-art" src={albumArt} alt="" />

  <div class="play-button">
    <PlayButton on:click={() => (paused = !paused)} {paused} />
  </div>
  <div class="contents">
    <div class="currently-playing-text">
      <h5 class="color--accent">{selected.title}</h5>
      <p class="color--subtext">{format(currentTime)}/{format(duration)}</p>
    </div>
    <div class="playbar-wrapper" on:mousemove={handleMousemove} on:mousedown={handleMousedown}>
      <div class="playbar">
        <div class="progress" style="width: {$percent}%;" />
        <div class="nub" style="left:{$percent}%;" />
      </div>
    </div>
    <div class="tracklist">
      {#each audio as track, i}
        <button
          class="track"
          on:click={() => {
            // epic extra logic because lukasz hates me
            if (selected === track) {
              return (currentTime = 0);
            }

            paused = true;
            selected = track;
            // this is dumb
            setTimeout(() => (paused = false), 50);
          }}
        >
          {#if selected === track && !paused}
            <strong>
              <Waveform />
            </strong>
          {:else}
            <strong class="color--accent">{(i + 1).toString().padStart(2, "0")}</strong>
          {/if}
          <p>{track.title}</p>
        </button>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../scss/mixins";

  * {
    user-select: none;
  }

  .player {
    position: relative;
    display: flex;
    background: var(--card);
    border-radius: 20px;
    padding: 30px 24% 30px 30px;
    width: calc(100% - 30px);
    min-height: 311px;
    margin: 150px 0 250px;

    @include media-down(sm) {
      margin-top: 40%;
      width: 100%;
      padding: 30px;
    }

    @include media-down(xs) {
      flex-direction: column;
      padding: 20px;
    }

    .play-button {
      padding-top: 23px;
    }

    .contents {
      margin-left: 30px;
      flex: 1;

      @include media-down(xs) {
        margin: 30px 0 0 0;
      }
    }
  }

  .album-art {
    position: absolute;
    width: 24%;
    top: -60px;
    right: -30px;
    border-radius: 20px;

    @include media-down(sm) {
      margin-bottom: 20px;
      z-index: -1;
      width: 100%;
      left: 30px;
      bottom: 10px;
      top: unset;
    }
  }

  .currently-playing-text {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    * {
      margin: 0 0 10px;
    }
  }

  .playbar-wrapper {
    padding: 9px 0;
    cursor: grab;
  }

  .playbar {
    position: relative;
    width: 100%;
    height: 6px;
    border-radius: 10px;
    background: var(--accent-trans);
    pointer-events: none;
  }

  .progress {
    height: 6px;
    border-radius: 10px;
    background: var(--accent);
    pointer-events: none;
  }

  .nub {
    position: absolute;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: var(--accent);
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: grab;
    pointer-events: none;
  }

  .tracklist {
    margin: 30px 0 0 -20px;

    @include media-down(xs) {
      margin: 30px -20px 0 -20px;
    }
  }

  .track {
    display: flex;
    align-items: center;
    border: none;
    width: 100%;
    border-radius: 10px;
    background: transparent;
    padding: 11px 20px;
    cursor: pointer;
    transition: background 150ms ease;

    &:hover,
    &:focus {
      outline: none;
      background: var(--background);
    }

    strong,
    p {
      margin: 0;
      text-align: left;
      font-weight: 700;
    }

    strong {
      width: 42px;
    }
  }
</style>
