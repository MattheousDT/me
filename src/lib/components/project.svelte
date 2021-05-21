<script>
  import type { IProject } from "$lib/util/transformers";
  import { projectTypeToString } from "$lib/util/transfomers";

  export let project: IProject;
</script>

<a href="/projects/{project.uid}">
  <article>
    <img src={project.thumb} alt="" />
    <div>
      <h6 class="color--accent">{projectTypeToString(project.type)}</h6>
      <h4>{project.title}</h4>
    </div>
  </article>
</a>

<style lang="scss">
  article {
    position: relative;
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

  a:hover {
    div {
      background: var(--accent);
    }
    h6,
    h4 {
      color: var(--background);
    }
  }
</style>
