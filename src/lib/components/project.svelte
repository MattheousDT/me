<script>
  export let uid: string;
  export let thumb: string;
  export let type: string;
  export let title: string;
  export let forwardSlash = "projects";
</script>

<a href="/{forwardSlash}/{uid}">
  <article>
    <img src={thumb} alt="" />
    <div>
      <h6 class="color--accent">{type}</h6>
      <h4>{title}</h4>
    </div>
  </article>
</a>

<style lang="scss">
  article {
    position: relative;
    margin-bottom: 60px;
  }

  img {
    width: calc(100% - 30px);
    height: 280px;
    object-fit: cover;
    border-radius: 20px;
  }

  div {
    position: absolute;
    background: var(--card);
    border-radius: 20px;
    padding: 30px;
    width: calc(100% - 30px);
    right: 0;
    bottom: -30px + 10px;
    transition: background 250ms ease;
  }

  h6,
  h4 {
    margin: 0;
    transition: color 250ms ease;
  }

  a:hover,
  a:focus {
    outline: none;

    div {
      background: var(--accent);
    }
    h6,
    h4 {
      color: var(--background);
    }
  }
</style>
