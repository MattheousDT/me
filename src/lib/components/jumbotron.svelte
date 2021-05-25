<script>
</script>

<section class="jumbotron">
  <img src="/svg/jumbotron_top_swoosh.svg" alt="" class="swoosh top" />
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>Hey, I'm Matt!</h2>
          <h1>Let's work together...</h1>
          <div class="buttons">
            <a href="/projects" class="button button--dark">View my projects</a>
            <a href="/contact" class="button button--dark">Get in touch</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <img src="/svg/jumbotron_bottom_swoosh.svg" alt="" class="swoosh bottom" />
</section>

<style lang="scss">
  @import "../scss/mixins";

  section {
    position: relative;
    margin: 135px 0 194px;
  }

  .content {
    background: var(--accent);
  }

  h1,
  h2 {
    margin: 0;
    color: var(--background);

    &::selection {
      color: var(--accent);
      background: var(--background);
    }
  }

  .buttons {
    margin-top: 20px;

    @include media-down(sm) {
      display: flex;
      flex-direction: column;

      > * {
        width: max-content;
      }
    }

    :first-child {
      margin-right: 15px;

      @include media-down(sm) {
        margin: 0 0 15px 0;
      }
    }
  }

  .swoosh {
    pointer-events: none;
    position: absolute;
    z-index: -1;
    width: 100%;
    object-fit: cover;
    user-select: none;

    &.top {
      // I have no idea how this works but it does
      height: calc(135px + 1vw);
      top: 2px;
      transform: translateY(-100%);
      object-position: bottom;
    }

    &.bottom {
      height: calc(284px + 10vw);
      bottom: 2px;
      transform: translateY(100%);
      object-position: top;
    }

    @media (min-width: 1920px) {
      object-fit: cover;
      height: auto !important;
      object-position: center;
    }
  }
</style>
