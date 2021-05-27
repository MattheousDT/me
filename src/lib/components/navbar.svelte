<script>
  // https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html

  import { page } from "$app/stores";

  const links = {
    Projects: "/projects",
    Blog: "/blog",
    //Contact: "/contact",
  };
</script>

<nav>
  <div class="container">
    <a class="logo" href="/">
      <img src="/svg/logo.svg" alt="Go home" />
    </a>
    <ul role="menubar" aria-label="Main navigation menu">
      <li role="none">
        <a role="menuitem" class:active={$page.path === "/"} href="/">Home</a>
      </li>
      {#each Object.entries(links) as [title, link]}
        <li role="none">
          <a role="menuitem" class:active={$page.path.startsWith(link)} href={link}>{title}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style lang="scss">
  @import "../scss/mixins";

  nav {
    position: absolute;
    padding: 20px 0;
    height: var(--nav-height);
    width: 100%;
    z-index: 999;
  }

  .logo {
    display: flex;
    height: 100%;

    @include media-down(sm) {
      display: none;
    }

    img {
      height: 100%;
      width: auto;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include media-down(sm) {
      justify-content: center;
    }
  }

  ul {
    list-style: none;
    margin: 0 -20px;
    padding: 0;
    display: flex;

    @include media-down(xs) {
      margin: 0;
      width: 100%;
      justify-content: space-evenly;
    }

    a {
      position: relative;
      margin: 0 20px;
      text-decoration: none;
      text-transform: uppercase;
      transition: color 150ms ease;

      @include media-down(xs) {
        margin: 0;
        flex: 1;
      }

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
      &:hover,
      &:focus {
        outline: none;
        color: var(--accent);
      }

      &.active::after {
        width: 100%;
        transition: width 250ms cubic-bezier(0.26, 1.29, 0.7, 1.18);
      }
    }
  }
</style>
