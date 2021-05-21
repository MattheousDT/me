<script>
  import { page } from "$app/stores";

  const links = {
    "About Me": "/about",
    Projects: "/projects",
    Blog: "/blog",
    contact: "/contact",
  };
</script>

<nav>
  <div class="container">
    <div />
    <ul role="navigation">
      <li><a class:active={$page.path === "/"} href="/">Home</a></li>
      {#each Object.entries(links) as [title, link]}
        <li><a class:active={$page.path.startsWith(link)} href={link}>{title}</a></li>
      {/each}
    </ul>
  </div>
</nav>

<style lang="scss">
  nav {
    padding: 30px 0;
    height: 83px;
  }

  .container {
    display: flex;
    justify-content: space-between;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;

    a {
      display: block;
      position: relative;
      margin: 0 20px;
      text-decoration: none;
      text-transform: uppercase;
      transition: color 150ms ease;

      &::after {
        content: "";
        position: absolute;
        width: 0%;
        height: 3px;
        border-radius: 4px;
        bottom: -9px;
        left: 50%;
        transition: width 250ms ease;
        transform: translate(-50%);

        background: var(--accent);
      }

      &.active,
      &:hover {
        color: var(--accent);
      }

      &.active::after {
        width: 3px;
      }

      &:hover::after {
        width: 100%;
        transition: width 250ms cubic-bezier(0.26, 1.29, 0.7, 1.18);
      }
    }

    li {
      &:last-child a {
        margin-right: 0;
      }
    }
  }
</style>
