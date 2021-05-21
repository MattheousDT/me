import PrismicDOM from "prismic-dom";
import Prism from "prismjs";
const Elements = PrismicDOM.RichText.Elements;

const htmlSerializer = (type, element, content, children) => {
  switch (type) {
    // Add a class to paragraph elements
    case Elements.paragraph:
      if (element.text === "") return `<br>`;
      return null;
    case Elements.preformatted:
      if (element.text?.startsWith("```")) {
        // const block = element.text.slice(3, -3);
        // const language = block.split("\n")[0];
        // const highlighted = Prism.highlight(
        //   block.slice(language.length - 1),
        //   Prism.languages[language],
        //   language
        // );
        // return `<code>${highlighted}</code>`;
        return null;
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
