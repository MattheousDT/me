<script>
  const clients: Record<string, [string, string]> = {
    tni: ["Tourism Northern Ireland", "https://tourismni.com"],
    erm: ["Environmental Resources Management", "https://erm.com"],
    lucid: ["Lucid", "https://lucid.house"],
    ptsb: ["Permanent TSB", "https://www.permanenttsb.ie/"],
    hop: ["Houses of Parliament", "https://www.parliament.uk/"],
    enersys: ["Enersys", "https://enersys.com"],
    falni: ["Forum for Adult Learning Northern Ireland", "https://falni.org"],
    mp: ["Mortgage Propeller", "https://mortgagepropeller.com"],
    eason: ["Eason & Sons", "https://eason.com"],
    feinwaru: ["Feinwaru Software", "https://feinwaru.com"],
  };
</script>

<section class="clients">
  <img src="/svg/clients_top_swoosh.svg" alt="" class="swoosh top" />
  <div class="content">
    <div class="container">
      <div class="row clients">
        {#each Object.entries(clients) as [code, [name, url]]}
          <a href={url} target="_blank">
            <img src="/svg/clients/client-{code}.svg" alt={name} class="client" />
          </a>
        {/each}
      </div>
    </div>
  </div>
  <img src="/svg/clients_bottom_swoosh.svg" alt="" class="swoosh bottom" />
</section>

<style lang="scss">
  @import "../scss/mixins";

  section {
    position: relative;
    margin: 84px 0 140px + 120px;
  }

  .content {
    background: var(--accent);
  }

  .clients {
    justify-content: center;
  }

  .client {
    padding: 0 15px;
    margin-bottom: 50px;
    user-select: none;

    @include media-down(sm) {
      margin-bottom: 10px;
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
      height: 84px;
      top: 1px;
      transform: translateY(-100%);
      object-position: bottom;
    }

    &.bottom {
      height: 140px;
      bottom: 1px;
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
