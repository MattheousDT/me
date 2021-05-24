import PrismicDOM from "prismic-dom";
import Prism from "prismjs";
import "prism-svelte";
import "prismjs/components/prism-scss.js";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-dart";

const Elements = PrismicDOM.RichText.Elements;

const htmlSerializer = (type, element, content, children) => {
  switch (type) {
    // Add a class to paragraph elements
    case Elements.paragraph:
      if (element.text === "") return `<br>`;
      return null;
    case Elements.preformatted:
      if (element.text?.startsWith("```")) {
        const block: string = element.text.slice(3, -3);
        const lang = block.split("\n")[0];
        let code = block.split("\n");
        code.shift();

        return `<code class="language-${lang} full-width">${Prism.highlight(
          code.join("\n"),
          Prism.languages[lang],
          lang
        )}</code>`;
      }
      return `<blockquote class="full-width">${children}</blockquote>`;

    // Don't wrap images in a <p> tag
    case Elements.image:
      return `
      <figure class="full-width">
        <img src="${element.url}" alt="${element.alt}" style="width:100%">
        <figcaption class="color--subtext">${element.alt}</figcaption>
      </figure>
      `;

    // Return null to stick with the default behavior for other elements
    default:
      return null;
  }
};

export default htmlSerializer;
