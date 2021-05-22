<article>
  <div class="img" />
  <div class="text">
    <div class="h6" />
    <div class="h4" />
  </div>
</article>

<style lang="scss">
  article {
    position: relative;
    margin-bottom: 60px;
  }

  .img {
    width: calc(100% - 30px);
    height: 280px;
    border-radius: 20px;
    background-color: #333;
  }

  .text {
    position: absolute;
    background: var(--card);
    border-radius: 20px;
    padding: 30px;
    width: calc(100% - 30px);
    right: 0;
    bottom: -30px + 10px;
  }

  .h6 {
    height: 20px;
    width: 30%;
    background: var(--accent);
    border-radius: 100px;
    margin-bottom: 10px;
  }

  .h4 {
    height: 36px;
    width: 75%;
    background: var(--text);
    border-radius: 100px;
    opacity: 0.3;
  }
</style>
